import type { StatsSummary } from "../types";
import { useTranslation } from "react-i18next";
import { Info } from "lucide-react";

interface StatsGridProps {
  stats: StatsSummary;
  onCardClick: (tab: string) => void;
}

export default function StatsGrid({ stats, onCardClick }: StatsGridProps) {
  const { t } = useTranslation();

  return (
    <section className="stats-grid">
      <div className="stat-card" onClick={() => onCardClick("all")}>
        <div className="stat-label" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>{t("statTotalScanned")}</span>
          <span title={t("statTotalScannedDesc")} style={{ opacity: 0.5, cursor: "help", display: "inline-flex" }}>
            <Info size={15} />
          </span>
        </div>
        <div className="stat-value">{stats.total_scan}</div>
      </div>
      <div className="stat-card success" onClick={() => onCardClick("posters")}>
        <div className="stat-label" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>{t("statUniqueGames")}</span>
          <span title={t("statUniqueGamesDesc")} style={{ opacity: 0.5, cursor: "help", display: "inline-flex" }}>
            <Info size={15} />
          </span>
        </div>
        <div className="stat-value">{stats.unique_games}</div>
      </div>
      <div className="stat-card warning" onClick={() => onCardClick("franchise")}>
        <div className="stat-label" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>{t("statFranchise")}</span>
          <span title={t("statFranchiseDesc")} style={{ opacity: 0.5, cursor: "help", display: "inline-flex" }}>
            <Info size={15} />
          </span>
        </div>
        <div className="stat-value">{stats.franchise_count || 0}</div>
      </div>
      <div className="stat-card danger" onClick={() => onCardClick("duplicates")}>
        <div className="stat-label" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>{t("statDuplicates")}</span>
          <span title={t("statDuplicatesDesc")} style={{ opacity: 0.5, cursor: "help", display: "inline-flex" }}>
            <Info size={15} />
          </span>
        </div>
        <div className="stat-value">{(stats.exact_dups || 0) + (stats.version_dups || 0)}</div>
      </div>
    </section>
  );
}
