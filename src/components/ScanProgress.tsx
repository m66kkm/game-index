import { X } from "lucide-react";
import type { RefObject } from "react";

interface ScanProgressProps {
  isScanning: boolean;
  scanProgress: number;
  scanMessage: string;
  scanLogs: string[];
  loggerRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

export default function ScanProgress({ isScanning, scanProgress, scanMessage, scanLogs, loggerRef, onClose }: ScanProgressProps) {
  if (!isScanning && scanLogs.length === 0) return null;
  
  return (
    <div className="progress-container" style={{ position: "relative" }}>
      <div className="progress-header">
        <span style={{ fontWeight: 600 }}>{scanMessage}</span>
        <span>{scanProgress}%</span>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${scanProgress}%` }}></div>
      </div>
      <div className="console-logger" ref={loggerRef}>
        {scanLogs.join("\n")}
      </div>
      {!isScanning && (
        <button 
          onClick={onClose}
          style={{
            position: "absolute",
            bottom: "0.5rem",
            right: "0.5rem",
            background: "rgba(0, 0, 0, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "var(--text-secondary)",
            borderRadius: "6px",
            padding: "0.4rem 0.6rem",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            cursor: "pointer",
            fontSize: "0.8rem",
            backdropFilter: "blur(4px)",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-primary)";
            e.currentTarget.style.background = "rgba(0, 0, 0, 0.8)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.background = "rgba(0, 0, 0, 0.6)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
          }}
        >
          <X size={14} />
          关闭
        </button>
      )}
    </div>
  );
}
