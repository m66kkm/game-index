import {
  Monitor,
  Sparkles,
  HardDrive,
  Layers,
  List
} from "lucide-react";

interface TabNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <nav className="tabs-nav">
      <button className={`tab-btn ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => onTabChange("dashboard")}>
        <Monitor size={15} />
        系统首页
      </button>
      <button className={`tab-btn ${activeTab === "posters" ? "active" : ""}`} onClick={() => onTabChange("posters")}>
        <Sparkles size={15} />
        海报墙 (Poster Wall)
      </button>
      <button className={`tab-btn ${activeTab === "installed" ? "active" : ""}`} onClick={() => onTabChange("installed")}>
        <HardDrive size={15} />
        已安装游戏
      </button>
      <button className={`tab-btn ${activeTab === "franchise" ? "active" : ""}`} onClick={() => onTabChange("franchise")}>
        <Layers size={15} />
        关联系列/续作
      </button>
      <button className={`tab-btn ${activeTab === "duplicates" ? "active" : ""}`} onClick={() => onTabChange("duplicates")}>
        <Layers size={15} />
        疑似重复
      </button>
      <button className={`tab-btn ${activeTab === "all" ? "active" : ""}`} onClick={() => onTabChange("all")}>
        <List size={15} />
        游戏完整索引
      </button>
    </nav>
  );
}
