import type { StatsSummary } from "../types";

interface StatsGridProps {
  stats: StatsSummary;
  onCardClick: (tab: string) => void;
}

export default function StatsGrid({ stats, onCardClick }: StatsGridProps) {
  return (
    <section className="stats-grid">
      <div className="stat-card" onClick={() => onCardClick("all")}>
        <div className="stat-label">扫描总数</div>
        <div className="stat-value">{stats.total_scan}</div>
        <div className="stat-desc">物理文件与目录的扫描汇总</div>
      </div>
      <div className="stat-card success" onClick={() => onCardClick("posters")}>
        <div className="stat-label">游戏个数</div>
        <div className="stat-value">{stats.unique_games}</div>
        <div className="stat-desc">智能去重后的独立游戏总数</div>
      </div>
      <div className="stat-card warning" onClick={() => onCardClick("franchise")}>
        <div className="stat-label">游戏系列/续作</div>
        <div className="stat-value">{stats.franchise_count || 0}</div>
        <div className="stat-desc">自动匹配关联的游戏合集数</div>
      </div>
      <div className="stat-card danger" onClick={() => onCardClick("duplicates")}>
        <div className="stat-label">疑似重复</div>
        <div className="stat-value">{(stats.exact_dups || 0) + (stats.version_dups || 0)}</div>
        <div className="stat-desc">版本冗余与物理重复备份数</div>
      </div>
    </section>
  );
}
