import { Search, LayoutGrid, List } from "lucide-react";

interface FilterBarProps {
  activeTab: string;
  searchVal: string;
  setSearchVal: (val: string) => void;
  driveVal: string;
  setDriveVal: (val: string) => void;
  typeVal: string;
  setTypeVal: (val: string) => void;
  sortVal: string;
  setSortVal: (val: string) => void;
  viewMode: "tile" | "detail";
  setViewMode: (mode: "tile" | "detail") => void;
  scanPaths: string[];
}

export default function FilterBar({
  activeTab,
  searchVal,
  setSearchVal,
  driveVal,
  setDriveVal,
  typeVal,
  setTypeVal,
  sortVal,
  setSortVal,
  viewMode,
  setViewMode,
  scanPaths
}: FilterBarProps) {
  if (activeTab === "dashboard" || activeTab === "settings") return null;

  return (
    <section className="controls-row">
      <div className="search-box">
        <Search className="search-icon" size={16} />
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="search-input"
          placeholder="输入游戏名称、包名或存储路径进行全局搜索..."
        />
      </div>
      <select
        value={driveVal}
        onChange={(e) => setDriveVal(e.target.value)}
        className="filter-select"
      >
        <option value="">所有盘符</option>
        {scanPaths.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <select
        value={typeVal}
        onChange={(e) => setTypeVal(e.target.value)}
        className="filter-select"
      >
        <option value="">所有类型</option>
        <option value="Directory">Directory (文件夹)</option>
        <option value="ISO">ISO (光盘镜像)</option>
      </select>
      
      {(activeTab === "posters" || activeTab === "installed" || activeTab === "all") && (
        <select
          value={sortVal}
          onChange={(e) => setSortVal(e.target.value)}
          className="filter-select"
        >
          <option value="">默认排序</option>
          <option value="name-asc">文件名 (A-Z)</option>
          <option value="name-desc">文件名 (Z-A)</option>
          <option value="steam-desc">Steam评分 (高到低)</option>
          <option value="steam-asc">Steam评分 (低到高)</option>
          <option value="size-desc">游戏大小 (大到小)</option>
          <option value="size-asc">游戏大小 (小到大)</option>
        </select>
      )}

      {(activeTab === "posters" || activeTab === "installed") && (
        <div className="view-toggle-group">
          <button
            className={`view-btn ${viewMode === "tile" ? "active" : ""}`}
            onClick={() => setViewMode("tile")}
          >
            <LayoutGrid size={14} />
            平铺
          </button>
          <button
            className={`view-btn ${viewMode === "detail" ? "active" : ""}`}
            onClick={() => setViewMode("detail")}
          >
            <List size={14} />
            详细
          </button>
        </div>
      )}
    </section>
  );
}
