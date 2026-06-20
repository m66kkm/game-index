import type { Game } from "../types";
import GameCard from "./GameCard";
import GameDetailRow from "./GameDetailRow";

interface PosterWallProps {
  games: Game[];
  viewMode: "tile" | "detail";
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  pageSize: number;
  title: string;
  subtitle: string;
  copyPath: (path: string, gameName: string) => void;
  openGameFolder: (path: string) => void;
}

export default function PosterWall({
  games,
  viewMode,
  currentPage,
  setCurrentPage,
  pageSize,
  title,
  subtitle,
  copyPath,
  openGameFolder
}: PosterWallProps) {
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
          <h2 style={{ margin: 0 }}>{title}</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem", marginBottom: 0 }}>
            {subtitle}
          </p>
        </div>
        {paginationControls}
      </div>

      {viewMode === "tile" ? (
        <div className="posters-grid">
          {paginatedGames.map((game) => (
            <GameCard
              key={game.full_path}
              game={game}
              onOpenFolder={openGameFolder}
            />
          ))}
        </div>
      ) : (
        <div className="posters-list">
          {paginatedGames.map((game) => (
            <GameDetailRow
              key={game.full_path}
              game={game}
              onCopyPath={copyPath}
              onOpenFolder={openGameFolder}
            />
          ))}
        </div>
      )}

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
          没有找到符合过滤条件的游戏。
        </div>
      )}
    </div>
  );
}
