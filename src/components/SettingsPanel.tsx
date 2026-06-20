import type { RefObject } from "react";
import { Plus, Play, RefreshCw } from "lucide-react";
import ScanProgress from "./ScanProgress";
import { useTranslation } from "react-i18next";
import { STEAM_LANGUAGES } from "../i18n";
import { invoke } from "@tauri-apps/api/core";

interface SettingsPanelProps {
  scanPaths: string[];
  addScanPath: () => void;
  removeScanPath: (path: string) => void;
  startScan: () => void;
  cancelScan: () => void;
  isScanning: boolean;
  scanProgress: number;
  scanMessage: string;
  scanLogs: string[];
  loggerRef: RefObject<HTMLDivElement | null>;
  steamApiThreads: number;
  saveSteamApiThreads: (threads: number) => void;
  clearLogs: () => void;
  language: string;
  saveLanguage: (lang: string) => void;
}

export default function SettingsPanel({
  scanPaths,
  addScanPath,
  removeScanPath,
  startScan,
  cancelScan,
  isScanning,
  scanProgress,
  scanMessage,
  scanLogs,
  loggerRef,
  steamApiThreads,
  saveSteamApiThreads,
  clearLogs,
  language,
  saveLanguage
}: SettingsPanelProps) {
  const { t } = useTranslation();

  return (
    <div className="panel" style={{ display: "block" }}>
      <div className="settings-section">
        <h3>{t("language")}</h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "1rem" }}>
          {t("languageDesc")}
        </p>
        <div className="path-input-group" style={{ maxWidth: "300px" }}>
          <select 
            value={language} 
            onChange={(e) => saveLanguage(e.target.value)}
            className="path-input"
            style={{ padding: "0.5rem", background: "var(--panel-bg)", color: "var(--text-primary)", border: "1px solid var(--panel-border)", borderRadius: "8px" }}
          >
            {STEAM_LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="settings-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 style={{ margin: 0 }}>{t("scanPathsMgmt")}</h3>
          <button className="action-btn" onClick={addScanPath} style={{ width: "auto", padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
            <Plus size={16} />
            {t("addPath")}
          </button>
        </div>

        <div className="paths-list">
          {scanPaths.map((path) => (
            <div key={path} className="path-item">
              <span className="path-text">{path}</span>
              <button className="remove-btn" onClick={() => removeScanPath(path)}>
                {t("remove")}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <h3 style={{ margin: 0 }}>{t("startSync")}</h3>
          <div style={{ display: "flex", gap: "1rem" }}>
            {!isScanning ? (
              <button className="action-btn" onClick={startScan} style={{ width: "auto", padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
                <Play size={16} />
                {t("startScan")}
              </button>
            ) : (
              <button className="action-btn" onClick={cancelScan} style={{ width: "auto", padding: "0.5rem 1rem", fontSize: "0.9rem", backgroundColor: "rgba(239, 68, 68, 0.2)", borderColor: "var(--danger-color)", color: "#fff" }}>
                {t("stopScan")}
              </button>
            )}
          </div>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "1rem" }}>
          {t("scanDesc")}
        </p>

        <ScanProgress
          isScanning={isScanning}
          scanProgress={scanProgress}
          scanMessage={scanMessage}
          scanLogs={scanLogs}
          loggerRef={loggerRef}
          onClose={clearLogs}
        />
      </div>

      <div className="settings-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <h3 style={{ margin: 0 }}>{t("apiThreads")}</h3>
          <button 
            className="action-btn" 
            onClick={async () => {
              try {
                await invoke("clear_steam_cache_command");
                startScan();
              } catch (e) {
                console.error(e);
              }
            }} 
            style={{ width: "auto", padding: "0.5rem 1rem", fontSize: "0.9rem" }}
            title={t("clearSteamCacheDesc")}
          >
            <RefreshCw size={14} />
            {t("clearSteamCache")}
          </button>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          {t("clearSteamCacheDesc")}
        </p>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "1rem" }}>
          {t("threadsDesc")}
        </p>
        <div className="path-input-group" style={{ maxWidth: "300px" }}>
          <input
            type="number"
            min="1"
            max="100"
            value={steamApiThreads}
            onChange={(e) => saveSteamApiThreads(parseInt(e.target.value) || 1)}
            className="path-input"
          />
          <span style={{ marginLeft: "1rem", color: "var(--text-secondary)" }}>{t("threads")}</span>
        </div>
      </div>
    </div>
  );
}
