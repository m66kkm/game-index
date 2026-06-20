import { ChevronDown, ExternalLink } from "lucide-react";
import type { FranchiseGroup } from "../types";
import { getRatingColorClass, getCoverUrl } from "../utils/helpers";

interface FranchisesPanelProps {
  franchises: FranchiseGroup[];
  openAccordions: { [key: string]: boolean };
  toggleAccordion: (key: string) => void;
  copyPath: (path: string, gameName: string) => void;
  openGameFolder: (path: string) => void;
}

export default function FranchisesPanel({ franchises, openAccordions, toggleAccordion, copyPath, openGameFolder }: FranchisesPanelProps) {
  return (
    <div className="panel" style={{ display: "block" }}>
      <div className="panel-header">
        <h2>关联系列及续作分布</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
          聚合了相似前缀词根（如 Resident Evil / Assassins Creed）的系列作品。
        </p>
      </div>

      <div className="accordion-container">
        {franchises.map((group) => {
          const isOpen = !!openAccordions[group.prefix];
          return (
            <div key={group.prefix} className={`accordion-item ${isOpen ? "open" : ""}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(group.prefix)}>
                <span>系列：{group.prefix}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  包含 {group.games.length} 个关联项
                  <ChevronDown className="accordion-icon" size={16} />
                </span>
              </div>
              <div className="accordion-content">
                <div className="table-container" style={{ border: "none", borderRadius: 0 }}>
                  <table>
                    <thead>
                      <tr>
                        <th>关联游戏目录名</th>
                        <th style={{ width: "160px" }}>Steam 评价</th>
                        <th style={{ width: "100px" }}>类型</th>
                        <th>具体存储路径</th>
                        <th style={{ width: "80px", textAlign: "center" }}>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.games.map((g) => (
                        <tr key={g.full_path}>
                          <td style={{ fontWeight: 600, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            {g.local_cover ? (
                              <img src={getCoverUrl(g.local_cover) || ""} style={{ width: "32px", height: "48px", objectFit: "cover", borderRadius: "4px", border: "1px solid var(--panel-border)" }} alt="" />
                            ) : (
                              <span style={{ display: "inline-block", width: "32px", height: "48px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", textAlign: "center", lineHeight: "48px", fontSize: "1.2rem" }}>🎮</span>
                            )}
                            {g.original_name}
                          </td>
                          <td>
                            {g.review_score_desc ? (
                              <span className={`rating-text ${getRatingColorClass(g.review_score_desc)}`} title={`好评率: ${g.positive_percent}% / 评论数: ${g.total_reviews}`}>
                                👍 {g.positive_percent}% ({g.review_score_desc})
                              </span>
                            ) : (
                              <span style={{ color: "var(--text-secondary)", opacity: 0.3 }}>-</span>
                            )}
                          </td>
                          <td>
                            <span className={`badge ${g.type === "Directory" ? "badge-dir" : "badge-iso"}`}>{g.type}</span>
                          </td>
                          <td>
                            <span className="code-path" onClick={() => copyPath(g.full_path, g.original_name)} title="点击复制路径">{g.full_path}</span>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <button className="view-btn" onClick={() => openGameFolder(g.full_path)} title="在资源管理器中打开" style={{ padding: "0.4rem", display: "inline-flex" }}>
                              <ExternalLink size={12} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })}

        {franchises.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-secondary)", border: "1px dashed var(--panel-border)", borderRadius: "12px" }}>
            没有找到符合条件的系列游戏。
          </div>
        )}
      </div>
    </div>
  );
}
