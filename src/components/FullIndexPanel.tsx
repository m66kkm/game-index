import { ExternalLink } from "lucide-react";
import type { Game } from "../types";
import { getRatingColorClass, getCoverUrl } from "../utils/helpers";

interface FullIndexPanelProps {
  games: Game[];
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  pageSize: number;
  copyPath: (path: string, gameName: string) => void;
  openGameFolder: (path: string) => void;
}

export default function FullIndexPanel({ games, currentPage, setCurrentPage, pageSize, copyPath, openGameFolder }: FullIndexPanelProps) {
  const totalItems = games.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedGames = games.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const paginationControls = totalItems > 0 && (
    <div className="pagination" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
      <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginRight: "0.5rem" }}>
        共 {totalItems} 个结果
      </span>
      <button className="page-btn" onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
        上一页
      </button>
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        let pageNum = currentPage - 2 + i;
        if (currentPage <= 2) pageNum = i + 1;
        else if (currentPage >= totalPages - 1) pageNum = totalPages - 4 + i;
        
        if (pageNum < 1 || pageNum > totalPages) return null;
        
        return (
          <button
            key={pageNum}
            className={`page-btn ${pageNum === currentPage ? "active" : ""}`}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}
      <button className="page-btn" onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
        下一页
      </button>
    </div>
  );

  return (
    <div className="panel" style={{ display: "block" }}>
      <div className="panel-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ margin: 0 }}>所有唯一游戏库索引</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem", marginBottom: 0 }}>
            完整展示盘库的每一个对象，支持无级排序和高级检索。
          </p>
        </div>
        {paginationControls}
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: "70px" }}>序号</th>
              <th>游戏目录名称</th>
              <th style={{ width: "160px" }}>Steam 评价</th>
              <th style={{ width: "100px" }}>类型</th>
              <th>存储盘路径</th>
              <th style={{ width: "150px" }}>状态标记</th>
              <th style={{ width: "80px", textAlign: "center" }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {paginatedGames.map((game, idx) => {
              const globalIdx = (currentPage - 1) * pageSize + idx + 1;
              return (
                <tr key={game.full_path}>
                  <td style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>{globalIdx}</td>
                  <td style={{ fontWeight: 600, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    {game.local_cover ? (
                      <img src={getCoverUrl(game.local_cover) || ""} style={{ width: "32px", height: "48px", objectFit: "cover", borderRadius: "4px", border: "1px solid var(--panel-border)" }} alt="" />
                    ) : (
                      <span style={{ display: "inline-block", width: "32px", height: "48px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", textAlign: "center", lineHeight: "48px", fontSize: "1.2rem" }}>🎮</span>
                    )}
                    {game.name || game.original_name}
                  </td>
                  <td>
                    {game.review_score_desc ? (
                      <span className={`rating-text ${getRatingColorClass(game.review_score_desc)}`}>
                        👍 {game.positive_percent}% ({game.review_score_desc})
                      </span>
                    ) : (
                      <span style={{ color: "var(--text-secondary)", opacity: 0.3 }}>-</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${game.type === "Directory" ? "badge-dir" : "badge-iso"}`}>{game.type}</span>
                  </td>
                  <td>
                    <span className="code-path" onClick={() => openGameFolder(game.full_path)} title="在资源管理器中打开">{game.full_path}</span>
                  </td>
                  <td>
                    {game.is_exact_dup && <span className="badge badge-dup" style={{ marginRight: "0.35rem" }}>完全重复</span>}
                    {game.is_version_dup && <span className="badge badge-ver">多版本</span>}
                    {!game.is_exact_dup && !game.is_version_dup && <span style={{ color: "var(--text-secondary)", opacity: 0.3 }}>-</span>}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button className="view-btn" onClick={() => openGameFolder(game.full_path)} title="在资源管理器中打开" style={{ padding: "0.4rem", display: "inline-flex" }}>
                      <ExternalLink size={12} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom Pagination Controls */}
      {totalItems > 0 && (
        <div className="results-info" style={{ marginTop: "1.5rem" }}>
          <span>当前显示 {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} 个游戏，共 {totalItems} 个结果</span>
          <div className="pagination">
            <button className="page-btn" onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              上一页
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = currentPage - 2 + i;
              if (currentPage <= 2) pageNum = i + 1;
              else if (currentPage >= totalPages - 1) pageNum = totalPages - 4 + i;
              
              if (pageNum < 1 || pageNum > totalPages) return null;
              
              return (
                <button
                  key={pageNum}
                  className={`page-btn ${pageNum === currentPage ? "active" : ""}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button className="page-btn" onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              下一页
            </button>
          </div>
        </div>
      )}

      {totalItems === 0 && (
        <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-secondary)", border: "1px dashed var(--panel-border)", borderRadius: "12px" }}>
          没有找到任何符合条件的游戏。
        </div>
      )}
    </div>
  );
}
