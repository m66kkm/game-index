import type { RefObject } from "react";
import { Plus, Play } from "lucide-react";
import ScanProgress from "./ScanProgress";

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
  clearLogs
}: SettingsPanelProps) {
  return (
    <div className="panel" style={{ display: "block" }}>
      <div className="panel-header">
        <h2>本地数据盘库设置</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
          在此管理游戏盘库扫描路径，并启动全量或增量数据盘库同步。
        </p>
      </div>

      <div className="settings-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 style={{ margin: 0 }}>📂 扫描根路径管理</h3>
          <button className="action-btn" onClick={addScanPath} style={{ width: "auto", padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
            <Plus size={16} />
            添加扫描路径
          </button>
        </div>

        <div className="paths-list">
          {scanPaths.map((path) => (
            <div key={path} className="path-item">
              <span className="path-text">{path}</span>
              <button className="remove-btn" onClick={() => removeScanPath(path)}>
                移除
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <h3 style={{ margin: 0 }}>⚡ 启动物理盘库同步</h3>
          <div style={{ display: "flex", gap: "1rem" }}>
            {!isScanning ? (
              <button className="action-btn" onClick={startScan} style={{ width: "auto", padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
                <Play size={16} />
                开始盘库同步
              </button>
            ) : (
              <button className="action-btn" onClick={cancelScan} style={{ width: "auto", padding: "0.5rem 1rem", fontSize: "0.9rem", backgroundColor: "rgba(239, 68, 68, 0.2)", borderColor: "var(--danger-color)", color: "#fff" }}>
                停止盘库扫描
              </button>
            )}
          </div>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "1rem" }}>
          点击"开始盘库同步"后，系统将遍历所有扫描路径，自动检索新游戏的 Steam 评分并离线下载高清竖版海报（已检索的游戏会走 SQLite 缓存，不产生重复流量）。
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
        <h3>🌐 Steam API 并发配置</h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "1rem" }}>
          设置向 Steam 请求数据时的并发线程数。推荐使用默认值 10，太高可能会被 Steam 暂时封禁 IP。
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
          <span style={{ marginLeft: "1rem", color: "var(--text-secondary)" }}>线程</span>
        </div>
      </div>
    </div>
  );
}
