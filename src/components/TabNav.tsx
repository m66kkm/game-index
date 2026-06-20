import {
  Monitor,
  Sparkles,
  HardDrive,
  Layers,
  List
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface TabNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: "dashboard", icon: Monitor, labelKey: "tabDashboard" },
  { id: "posters", icon: Sparkles, labelKey: "tabPosters" },
  { id: "installed", icon: HardDrive, labelKey: "tabInstalled" },
  { id: "franchise", icon: Layers, labelKey: "tabFranchise" },
  { id: "duplicates", icon: Layers, labelKey: "tabDuplicates" },
];

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
  const { t } = useTranslation();

  return (
    <nav className="tabs-nav">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`tab-btn ${isActive ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "var(--primary-accent)",
                  boxShadow: "0 0 12px rgba(0, 242, 254, 0.2)",
                  borderRadius: "10px",
                  zIndex: 0
                }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Icon size={15} />
              {t(tab.labelKey)}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
