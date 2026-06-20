import { Play, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  isScanning: boolean;
  onStartScan: () => void;
  onSettingsClick: () => void;
  isSettingsActive: boolean;
}

export default function Header({ isScanning, onStartScan, onSettingsClick, isSettingsActive }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header>
      <div>
        <h1>{t("headerTitle")}</h1>
        <div className="subtitle">{t("headerSubtitle")}</div>
      </div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button 
          className="action-btn" 
          onClick={onStartScan} 
          disabled={isScanning}
          style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
        >
          <Play size={14} className={isScanning ? "animate-spin" : ""} />
          {isScanning ? t("scanning") : t("incScan")}
        </button>
        <button 
          className={`view-btn ${isSettingsActive ? "active" : ""}`}
          onClick={onSettingsClick}
          style={{ padding: "0.5rem" }}
          title={t("settingsBtn")}
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
