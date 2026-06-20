import { ExternalLink } from "lucide-react";
import type { Game } from "../types";
import { getRatingColorClass, getCoverUrl, getGradientsForName } from "../utils/helpers";

interface GameDetailRowProps {
  game: Game;
  onCopyPath: (path: string, gameName: string) => void;
  onOpenFolder: (path: string) => void;
}

export default function GameDetailRow({ game, onCopyPath, onOpenFolder }: GameDetailRowProps) {
  const cover = getCoverUrl(game.local_cover);

  return (
    <div className="detail-row" onClick={() => onCopyPath(game.full_path, game.original_name)}>
      <div className="detail-cover-container">
        {cover ? (
          <img className="detail-cover-img" src={cover} alt={game.original_name} loading="lazy" />
        ) : (
          <div className="detail-fallback" style={{ background: getGradientsForName(game.original_name) }}>🎮</div>
        )}
      </div>
      <div className="detail-content">
        <div className="detail-header-line">
          <div className="detail-game-title" title={game.name || game.original_name}>{game.name || game.original_name}</div>
        </div>
        <div className="detail-path-line">
          <span className={`badge ${game.type === "Directory" ? "badge-dir" : "badge-iso"}`}>{game.type}</span>
          <span className="code-path" onClick={(e) => { e.stopPropagation(); onCopyPath(game.full_path, game.original_name); }} title="点击复制路径">{game.full_path}</span>
        </div>
        <div className="detail-info-line">
          <div className="detail-info-item">大小: <strong>{game.size}</strong></div>
          <div className="detail-info-item">物理位置: <strong>{game.source_path}</strong></div>
        </div>
      </div>
      <div className="detail-right-meta">
        {game.review_score_desc ? (
          <span className={`rating-text ${getRatingColorClass(game.review_score_desc)}`} title={`Steam好评率: ${game.positive_percent}% / 总评论数: ${game.total_reviews}`}>
            👍 {game.positive_percent}% ({game.review_score_desc})
          </span>
        ) : (
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", opacity: 0.5 }}>暂无评分</span>
        )}
        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>发行: <span style={{ color: "var(--text-primary)" }}>{game.release_date || "未知"}</span></div>
        <div style={{ fontSize: "0.725rem", color: "var(--text-secondary)", opacity: 0.8 }}>创建: <span style={{ color: "var(--text-primary)" }}>{game.created || "未知"}</span></div>
      </div>
      <div style={{ marginLeft: "1rem", display: "flex", gap: "0.5rem" }} onClick={(e) => e.stopPropagation()}>
        <button className="view-btn" onClick={() => onOpenFolder(game.full_path)} title="在资源管理器中打开" style={{ padding: "0.4rem" }}>
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
}
