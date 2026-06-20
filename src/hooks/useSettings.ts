import { useState, useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";

export function useSettings() {
  const [scanPaths, setScanPaths] = useState<string[]>([]);
  const [steamApiThreads, setSteamApiThreads] = useState<number>(10);
  const [language, setLanguage] = useState<string>("schinese");

  // Load scan paths
  const loadScanPaths = useCallback(async () => {
    try {
      const paths = await invoke<string[]>("get_scan_paths_command");
      setScanPaths(paths);
      const config = await invoke<Record<string, string>>("get_all_config_command");
      if (config.steam_api_threads) {
        setSteamApiThreads(parseInt(config.steam_api_threads) || 10);
      }
      if (config.language) {
        setLanguage(config.language);
        import("../i18n").then(({ default: i18n }) => i18n.changeLanguage(config.language));
      }
    } catch (e) {
      console.error("加载配置失败:", e);
    }
  }, []);

  const saveSteamApiThreads = useCallback(async (threads: number, showToast: (msg: string) => void) => {
    try {
      await invoke("set_config_command", { key: "steam_api_threads", value: threads.toString() });
      setSteamApiThreads(threads);
      showToast(`已保存多线程配置 (当前: ${threads} 线程)`);
    } catch (e) {
      console.error(e);
      showToast("保存多线程配置失败");
    }
  }, []);

  const saveLanguage = useCallback(async (lang: string, showToast: (msg: string) => void) => {
    try {
      await invoke("set_config_command", { key: "language", value: lang });
      setLanguage(lang);
      import("../i18n").then(({ default: i18n }) => i18n.changeLanguage(lang));
      showToast(`已切换语言 / Language switched`);
    } catch (e) {
      console.error(e);
      showToast("切换语言失败 / Failed to switch language");
    }
  }, []);

  // Add scan path
  const addScanPath = useCallback(async (showToast: (msg: string) => void) => {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
      });
      if (selected === null) return; // User cancelled
      
      const path = selected as string;
      await invoke("add_scan_path_command", { path });
      loadScanPaths();
      showToast("成功添加扫描路径");
    } catch (e) {
      console.error(e);
      showToast("添加路径失败");
    }
  }, [loadScanPaths]);

  // Remove scan path
  const removeScanPath = useCallback(async (path: string, showToast: (msg: string) => void) => {
    try {
      await invoke("remove_scan_path_command", { path });
      loadScanPaths();
      showToast("已移除该扫描路径");
    } catch (e) {
      console.error(e);
    }
  }, [loadScanPaths]);

  return {
    scanPaths,
    loadScanPaths,
    addScanPath,
    removeScanPath,
    steamApiThreads,
    saveSteamApiThreads,
    language,
    saveLanguage
  };
}
