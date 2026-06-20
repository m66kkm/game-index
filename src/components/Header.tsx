import { Play, Settings } from "lucide-react";

interface HeaderProps {
  isScanning: boolean;
  onStartScan: () => void;
  onSettingsClick: () => void;
  isSettingsActive: boolean;
}

export default function Header({ isScanning, onStartScan, onSettingsClick, isSettingsActive }: HeaderProps) {
  return (
    <header>
      <div>
        <h1>游戏库索引控制台</h1>
        <div className="subtitle">基于 Tauri 2 + SQLite 3 的本地化游戏盘库管理平台</div>
      </div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button 
          className="action-btn" 
          onClick={onStartScan} 
          disabled={isScanning}
          style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
        >
          <Play size={14} className={isScanning ? "animate-spin" : ""} />
          {isScanning ? "正在扫描..." : "增量盘库"}
        </button>
        <button 
          className={`view-btn ${isSettingsActive ? "active" : ""}`}
          onClick={onSettingsClick}
          style={{ padding: "0.5rem" }}
          title="盘库设置"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
