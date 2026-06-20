interface DashboardProps {
  scanPaths: string[];
}

export default function Dashboard({ scanPaths }: DashboardProps) {
  return (
    <div>
      <div className="panel" style={{ borderTopColor: "var(--primary-accent)", display: "block" }}>
        <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "var(--primary-accent)", boxShadow: "0 0 10px var(--primary-accent)" }}></span>
          盘库系统与存储概览
        </h3>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.75rem", maxWidth: "800px", fontSize: "0.95rem" }}>
          本地控制台支持实时读取 SQLite 3 数据库，动态管理扫描目录，支持 Windows 资源管理器级的文件直达操作。海报数据完全保存在本地，支持离线展示。
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {scanPaths.map((path) => (
            <div key={path} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--panel-border)", borderRadius: "12px", padding: "1.25rem" }}>
              <div style={{ fontWeight: 600, color: "var(--primary-accent)", marginBottom: "0.5rem", display: "flex", justifyContent: "space-between" }}>
                <span>{path}</span>
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: "1.5" }}>
                自定义存储的盘库根目录。可随时在盘库设置中进行添加、删除。
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="panel" style={{ display: "block" }}>
        <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "1.25rem" }}>本地智能盘库指南</h3>
        <div style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.8" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            <div>
              <h4 style={{ color: "var(--primary-accent)", fontWeight: 600, fontSize: "1.05rem", marginBottom: "0.5rem" }}>🖼 离线海报墙与直达操作</h4>
              <p style={{ fontSize: "0.875rem" }}>点击 <strong>"海报墙"</strong> 或 <strong>"已安装游戏"</strong> 体验本地化网格，点击卡片直接<strong>复制路径</strong>，海报大图加载非常流畅。更有详细模式一键打开本地文件夹。</p>
            </div>
            <div>
              <h4 style={{ color: "var(--danger-color)", fontWeight: 600, fontSize: "1.05rem", marginBottom: "0.5rem" }}>📁 清除完全重复文件</h4>
              <p style={{ fontSize: "0.875rem" }}>完全相同的游戏在多处保存将浪费海量空间。通过 <strong>"完全重复"</strong> 页面能够极速识别冗余。通过文件路径定位能够轻松清理垃圾备份。</p>
            </div>
            <div>
              <h4 style={{ color: "var(--warning-color)", fontWeight: 600, fontSize: "1.05rem", marginBottom: "0.5rem" }}>💿 版本与 repack 管理</h4>
              <p style={{ fontSize: "0.875rem" }}>系统会自动对疑似版本重复的游戏目录进行分组（如 FitGirl 版、未加密版和更新档），帮助您根据需要决定保留哪个物理版本。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
