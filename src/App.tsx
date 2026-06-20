import { useState, useEffect, useRef, useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { StatsSummary } from "./types";
import { useGames } from "./hooks/useGames";
import { useScan } from "./hooks/useScan";
import { useSettings } from "./hooks/useSettings";
import Header from "./components/Header";
import StatsGrid from "./components/StatsGrid";
import TabNav from "./components/TabNav";
import FilterBar from "./components/FilterBar";
import Dashboard from "./components/Dashboard";
import PosterWall from "./components/PosterWall";
import DuplicatesPanel from "./components/DuplicatesPanel";
import FranchisesPanel from "./components/FranchisesPanel";
import FullIndexPanel from "./components/FullIndexPanel";
import SettingsPanel from "./components/SettingsPanel";
import Toast from "./components/Toast";

export default function App() {
  // Navigation & View states
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [viewMode, setViewMode] = useState<"tile" | "detail">("tile");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 36;

  // Filter states
  const [searchVal, setSearchVal] = useState<string>("");
  const [driveVal, setDriveVal] = useState<string>("");
  const [typeVal, setTypeVal] = useState<string>("");
  const [sortVal, setSortVal] = useState<string>("");

  // Data states
  const [stats, setStats] = useState<StatsSummary>({
    total_scan: 0,
    unique_games: 0,
    franchise_count: 0,
    exact_dups: 0,
    version_dups: 0
  });

  // Feedback states
  const [toastMessage, setToastMessage] = useState<string>("");
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({});
  
  const loggerRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  }, []);

  // Custom hooks
  const { gamesList, exactDuplicates, versionDuplicates, franchises, loadGames, loadDuplicates, loadFranchises } = useGames({
    searchVal, driveVal, typeVal, sortVal
  });

  const { scanPaths, loadScanPaths, addScanPath, removeScanPath, steamApiThreads, saveSteamApiThreads } = useSettings();

  // Load stats summary from DB
  const loadStats = useCallback(async () => {
    try {
      const summary = await invoke<StatsSummary>("get_games_stats_command");
      setStats(summary);
    } catch (e) {
      console.error("加载统计数据失败:", e);
    }
  }, []);

  // Trigger loading for tab specific data
  const loadTabData = useCallback(() => {
    if (activeTab === "posters") {
      loadGames(true, false);
    } else if (activeTab === "installed") {
      loadGames(true, true);
    } else if (activeTab === "all") {
      loadGames(false, false);
    } else if (activeTab === "duplicates") {
      loadDuplicates();
    } else if (activeTab === "franchise") {
      loadFranchises();
    } else if (activeTab === "dashboard") {
      loadStats();
    }
  }, [activeTab, loadGames, loadDuplicates, loadFranchises, loadStats]);

  const onScanComplete = useCallback(() => {
    showToast("数据盘库扫描成功完成！");
    loadStats();
    loadTabData();
  }, [showToast, loadStats, loadTabData]);

  const { isScanning, scanProgress, scanMessage, scanLogs, startScan, cancelScan, clearLogs } = useScan({
    onComplete: onScanComplete
  });

  // Initialize
  useEffect(() => {
    loadStats();
    loadScanPaths();
  }, [loadStats, loadScanPaths]);

  // Fetch items based on active tab and filters
  useEffect(() => {
    setCurrentPage(1);
    loadTabData();
  }, [activeTab, searchVal, driveVal, typeVal, sortVal, loadTabData]);

  // Scroll to bottom of logger
  useEffect(() => {
    if (loggerRef.current) {
      loggerRef.current.scrollTop = loggerRef.current.scrollHeight;
    }
  }, [scanLogs]);

  // Open directory in File Explorer
  const openGameFolder = useCallback(async (path: string) => {
    try {
      await invoke("open_game_folder_command", { path });
      showToast("已在文件资源管理器中打开该路径");
    } catch (e) {
      console.error(e);
      showToast("打开文件夹失败");
    }
  }, [showToast]);

  // Copy path to clipboard
  const copyPath = useCallback((path: string, gameName: string) => {
    navigator.clipboard.writeText(path).then(() => {
      showToast(`已复制路径: ${gameName}`);
    }).catch(() => {
      showToast("路径复制失败");
    });
  }, [showToast]);

  const toggleAccordion = useCallback((key: string) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleAddScanPath = useCallback(() => {
    addScanPath(showToast);
  }, [addScanPath, showToast]);

  const handleRemoveScanPath = useCallback((path: string) => {
    removeScanPath(path, showToast);
  }, [removeScanPath, showToast]);

  const handleSaveSteamApiThreads = useCallback((threads: number) => {
    saveSteamApiThreads(threads, showToast);
  }, [saveSteamApiThreads, showToast]);

  return (
    <div className="container">
      {/* Header */}
      <Header
        isScanning={isScanning}
        onStartScan={startScan}
        onSettingsClick={() => setActiveTab("settings")}
        isSettingsActive={activeTab === "settings"}
      />

      {/* Tab Nav */}
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Filter Row */}
      <FilterBar
        activeTab={activeTab}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        driveVal={driveVal}
        setDriveVal={setDriveVal}
        typeVal={typeVal}
        setTypeVal={setTypeVal}
        sortVal={sortVal}
        setSortVal={setSortVal}
        viewMode={viewMode}
        setViewMode={setViewMode}
        scanPaths={scanPaths}
      />

      {/* Scrollable Tab Content Area */}
      <div className="tab-content-scrollable">
        {/* DASHBOARD PANEL */}
        {activeTab === "dashboard" && (
          <>
            <StatsGrid stats={stats} onCardClick={setActiveTab} />
            <Dashboard scanPaths={scanPaths} />
          </>
        )}

        {/* POSTERS / INSTALLED PANEL */}
        {(activeTab === "posters" || activeTab === "installed") && (
          <PosterWall
            games={gamesList}
            viewMode={viewMode}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            title={activeTab === "posters" ? "独立海报墙 (Poster Wall)" : "已安装游戏库"}
            subtitle="点击卡片或详情列表，可直接在资源管理器中打开游戏目录。"
            copyPath={copyPath}
            openGameFolder={openGameFolder}
          />
        )}

        {/* DUPLICATES PANEL */}
        {activeTab === "duplicates" && (
          <DuplicatesPanel
            exactDuplicates={exactDuplicates}
            versionDuplicates={versionDuplicates}
            copyPath={copyPath}
            openGameFolder={openGameFolder}
          />
        )}

        {/* FRANCHISES PANEL */}
        {activeTab === "franchise" && (
          <FranchisesPanel
            franchises={franchises}
            openAccordions={openAccordions}
            toggleAccordion={toggleAccordion}
            copyPath={copyPath}
            openGameFolder={openGameFolder}
          />
        )}

        {/* ALL GAMES INDEX PANEL */}
        {activeTab === "all" && (
          <FullIndexPanel
            games={gamesList}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            copyPath={copyPath}
            openGameFolder={openGameFolder}
          />
        )}

        {/* SETTINGS PANEL */}
        {activeTab === "settings" && (
          <SettingsPanel
            scanPaths={scanPaths}
            addScanPath={handleAddScanPath}
            removeScanPath={handleRemoveScanPath}
            startScan={startScan}
            cancelScan={cancelScan}
            isScanning={isScanning}
            scanProgress={scanProgress}
            scanMessage={scanMessage}
            scanLogs={scanLogs}
            loggerRef={loggerRef}
            steamApiThreads={steamApiThreads}
            saveSteamApiThreads={handleSaveSteamApiThreads}
            clearLogs={clearLogs}
          />
        )}
      </div>

      {/* Toast popup */}
      <Toast message={toastMessage} />
    </div>
  );
}
