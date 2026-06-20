import type { StatsSummary } from "../types";
import { useTranslation } from "react-i18next";

interface StatsGridProps {
  stats: StatsSummary;
  onCardClick: (tab: string) => void;
}

export default function StatsGrid({ stats, onCardClick }: StatsGridProps) {
  const { t } = useTranslation();

  return (
    <section className="stats-grid">
      <div className="stat-card" onClick={() => onCardClick("all")}>
        <div className="stat-label">{t("statTotalScanned")}</div>
        <div className="stat-value">{stats.total_scan}</div>
        <div className="stat-desc">{t("statTotalScannedDesc")}</div>
      </div>
      <div className="stat-card success" onClick={() => onCardClick("posters")}>
        <div className="stat-label">{t("statUniqueGames")}</div>
        <div className="stat-value">{stats.unique_games}</div>
        <div className="stat-desc">{t("statUniqueGamesDesc")}</div>
      </div>
      <div className="stat-card warning" onClick={() => onCardClick("franchise")}>
        <div className="stat-label">{t("statFranchise")}</div>
        <div className="stat-value">{stats.franchise_count || 0}</div>
        <div className="stat-desc">{t("statFranchiseDesc")}</div>
      </div>
      <div className="stat-card danger" onClick={() => onCardClick("duplicates")}>
        <div className="stat-label">{t("statDuplicates")}</div>
        <div className="stat-value">{(stats.exact_dups || 0) + (stats.version_dups || 0)}</div>
        <div className="stat-desc">{t("statDuplicatesDesc")}</div>
      </div>
    </section>
  );
}
