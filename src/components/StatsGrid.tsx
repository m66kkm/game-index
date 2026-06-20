import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { StatsSummary } from "../types";
import { useTranslation } from "react-i18next";
import { Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function StatTooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (show && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
      });
    }
  }, [show]);

  return (
    <div 
      ref={iconRef}
      style={{ display: "inline-flex", alignItems: "center" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Info size={15} style={{ opacity: 0.5, cursor: "help" }} />
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0, y: "calc(-100% + 8px)", x: "-50%" }}
              animate={{ opacity: 1, y: "-100%", x: "-50%" }}
              exit={{ opacity: 0, y: "calc(-100% + 8px)", x: "-50%" }}
              transition={{ duration: 0.15 }}
              style={{
                position: "fixed",
                top: coords.top,
                left: coords.left,
                background: "rgba(15, 23, 42, 0.95)",
                border: "1px solid var(--primary-accent)",
                padding: "0.5rem 0.85rem",
                borderRadius: "8px",
                color: "var(--text-primary)",
                fontSize: "0.85rem",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.6), 0 0 10px rgba(0, 242, 254, 0.2)",
                zIndex: 9999,
                pointerEvents: "none",
                fontWeight: "normal",
                textTransform: "none",
                letterSpacing: "normal"
              }}
            >
              {text}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

interface StatsGridProps {
  stats: StatsSummary;
  onCardClick: (tab: string) => void;
}

export default function StatsGrid({ stats, onCardClick }: StatsGridProps) {
  const { t } = useTranslation();

  return (
    <section className="stats-grid">
      <div className="stat-card" onClick={() => onCardClick("all")}>
        <div className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span>{t("statTotalScanned")}</span>
          <StatTooltip text={t("statTotalScannedDesc")} />
        </div>
        <div className="stat-value">{stats.total_scan}</div>
      </div>
      <div className="stat-card success" onClick={() => onCardClick("posters")}>
        <div className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span>{t("statUniqueGames")}</span>
          <StatTooltip text={t("statUniqueGamesDesc")} />
        </div>
        <div className="stat-value">{stats.unique_games}</div>
      </div>
      <div className="stat-card warning" onClick={() => onCardClick("franchise")}>
        <div className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span>{t("statFranchise")}</span>
          <StatTooltip text={t("statFranchiseDesc")} />
        </div>
        <div className="stat-value">{stats.franchise_count || 0}</div>
      </div>
      <div className="stat-card danger" onClick={() => onCardClick("duplicates")}>
        <div className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span>{t("statDuplicates")}</span>
          <StatTooltip text={t("statDuplicatesDesc")} />
        </div>
        <div className="stat-value">{(stats.exact_dups || 0) + (stats.version_dups || 0)}</div>
      </div>
    </section>
  );
}
