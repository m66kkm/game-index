import os
import re

def main():
    root = "D:/Sources/gameIndex/src"
    
    # 1. Update i18n.ts
    i18n_path = os.path.join(root, "i18n.ts")
    with open(i18n_path, "r", encoding="utf-8") as f:
        i18n_content = f.read()

    new_zh = """
      "filterSearch": "输入游戏名称、包名或存储路径进行全局搜索...",
      "filterAllDrives": "所有盘符",
      "filterAllTypes": "所有类型",
      "filterDir": "Directory (文件夹)",
      "filterIso": "ISO (光盘镜像)",
      "filterSortDefault": "默认排序",
      "filterSortNameAsc": "文件名 (A-Z)",
      "filterSortNameDesc": "文件名 (Z-A)",
      "filterSortSteamDesc": "Steam评分 (高到低)",
      "filterSortSteamAsc": "Steam评分 (低到高)",
      "filterSortSizeDesc": "游戏大小 (大到小)",
      "filterSortSizeAsc": "游戏大小 (小到大)",
      "filterViewTile": "平铺",
      "filterViewDetail": "详细",

      "colIndex": "序号",
      "colName": "游戏目录名称",
      "colSteamRating": "Steam 评价",
      "colGenre": "游戏类型",
      "colFile": "文件",
      "colPath": "存储盘路径",
      "colStatus": "状态标记",
      "colAction": "操作",
      
      "tagExactDup": "完全重复",
      "tagVersionDup": "多版本",
      
      "btnPrevPage": "上一页",
      "btnNextPage": "下一页",
      "paginationInfo": "当前显示 {start} - {end} 个游戏，共 {total} 个结果",
      "paginationTotal": "共 {total} 个结果",
      "noResults": "没有找到任何符合条件的游戏。",
      "openInExplorer": "在资源管理器中打开",
      "copyPathMsg": "点击复制路径",
      "sizeLabel": "大小:",
      "physicalPathLabel": "物理位置:",
      "genreLabel": "类型:",
      "noRating": "暂无评分",
      "releaseLabel": "发行:",
      "createdLabel": "创建:",
      "unknown": "未知",
      "steamRatingHover": "Steam好评率: {percent}% / 总评论数: {total}",
      "actionExpand": "展开",
      "actionCollapse": "收起",
      
      "wallTitlePosters": "独立海报墙 (Poster Wall)",
      "wallTitleInstalled": "已安装游戏库",
      "wallSubtitle": "点击卡片或详情列表，可直接在资源管理器中打开游戏目录。",
      "wallNoGames": "该视图下暂无游戏",
      
      "dupTitle": "完全重复与版本冗余分析",
      "dupSubtitle": "基于文件夹名智能分组，精准定位重复浪费空间的文件。",
      "dupExactWarning": "警告：检测到完全重复的文件夹名称！这些文件浪费了您的物理存储空间。",
      "dupVersionInfo": "疑似同一个游戏的不同版本或 Repack，建议核对并保留一个最新版。",
      "dupGroupExact": "组 {index} (完全重复: {name})",
      "dupGroupVersion": "组 {index} (多版本: {name})",
      
      "franTitle": "游戏系列与续作合集",
      "franSubtitle": "通过相似度算法自动提取的系列或续作，帮助你按系列整理和回顾经典。",
      "franGroup": "{name} 系列 (包含 {count} 部)",
      
      "allTitle": "所有唯一游戏库索引",
      "allSubtitle": "完整展示盘库的每一个对象，支持无级排序和高级检索。"
"""

    new_en = """
      "filterSearch": "Search game name, folder, or path...",
      "filterAllDrives": "All Drives",
      "filterAllTypes": "All Types",
      "filterDir": "Directory (Folder)",
      "filterIso": "ISO (Image)",
      "filterSortDefault": "Default Sort",
      "filterSortNameAsc": "Name (A-Z)",
      "filterSortNameDesc": "Name (Z-A)",
      "filterSortSteamDesc": "Steam Rating (High to Low)",
      "filterSortSteamAsc": "Steam Rating (Low to High)",
      "filterSortSizeDesc": "Size (Large to Small)",
      "filterSortSizeAsc": "Size (Small to Large)",
      "filterViewTile": "Tile",
      "filterViewDetail": "Detail",

      "colIndex": "#",
      "colName": "Game Directory Name",
      "colSteamRating": "Steam Rating",
      "colGenre": "Genre",
      "colFile": "File",
      "colPath": "Storage Path",
      "colStatus": "Status Tags",
      "colAction": "Action",
      
      "tagExactDup": "Exact Duplicate",
      "tagVersionDup": "Versions",
      
      "btnPrevPage": "Prev",
      "btnNextPage": "Next",
      "paginationInfo": "Showing {start} - {end} of {total} results",
      "paginationTotal": "{total} Results",
      "noResults": "No games found matching criteria.",
      "openInExplorer": "Open in File Explorer",
      "copyPathMsg": "Click to copy path",
      "sizeLabel": "Size:",
      "physicalPathLabel": "Physical Path:",
      "genreLabel": "Genre:",
      "noRating": "No Rating",
      "releaseLabel": "Release:",
      "createdLabel": "Created:",
      "unknown": "Unknown",
      "steamRatingHover": "Steam Positive: {percent}% / Total Reviews: {total}",
      "actionExpand": "Expand",
      "actionCollapse": "Collapse",
      
      "wallTitlePosters": "Poster Wall",
      "wallTitleInstalled": "Installed Games",
      "wallSubtitle": "Click a card or detail row to open the game directory in File Explorer.",
      "wallNoGames": "No games available in this view",
      
      "dupTitle": "Duplicates & Version Analysis",
      "dupSubtitle": "Smart grouping based on folder names to locate wasted space.",
      "dupExactWarning": "Warning: Exact duplicate folder names detected! Wasting storage space.",
      "dupVersionInfo": "Suspected different versions or Repacks of the same game. Keep one.",
      "dupGroupExact": "Group {index} (Exact: {name})",
      "dupGroupVersion": "Group {index} (Versions: {name})",
      
      "franTitle": "Game Franchises & Sequels",
      "franSubtitle": "Automatically extracted franchises using similarity algorithms.",
      "franGroup": "{name} Franchise ({count} games)",
      
      "allTitle": "Full Index",
      "allSubtitle": "Complete list of every item in your library. Supports sorting and advanced filtering."
"""

    i18n_content = i18n_content.replace('"dashGuide3Desc": "系统会自动对疑似版本重复的游戏目录进行分组（如 FitGirl 版、未加密版和更新档），帮助您根据需要决定保留哪个物理版本。"', 
                                        '"dashGuide3Desc": "系统会自动对疑似版本重复的游戏目录进行分组（如 FitGirl 版、未加密版和更新档），帮助您根据需要决定保留哪个物理版本。",\n' + new_zh)
    
    i18n_content = i18n_content.replace('"dashGuide3Desc": "Automatically groups suspected duplicate versions (e.g., FitGirl, cracked, patches) to help you decide which physical version to keep."',
                                        '"dashGuide3Desc": "Automatically groups suspected duplicate versions (e.g., FitGirl, cracked, patches) to help you decide which physical version to keep.",\n' + new_en)
                                        
    with open(i18n_path, "w", encoding="utf-8") as f:
        f.write(i18n_content)

    # 2. Helper to replace in components
    def process_component(filename, replacements):
        path = os.path.join(root, "components", filename)
        if not os.path.exists(path): return
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Add import if missing
        if "useTranslation" not in content:
            content = content.replace('import {', 'import { useTranslation } from "react-i18next";\nimport {', 1)
            
            # Inject hook
            if "export default function " in content:
                content = re.sub(r'(export default function \w+\([^)]*\) \{)', r'\1\n  const { t } = useTranslation();\n', content)
        
        for k, v in replacements.items():
            content = content.replace(k, v)
            
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)

    process_component("FilterBar.tsx", {
        '"输入游戏名称、包名或存储路径进行全局搜索..."': '{t("filterSearch")}',
        '>所有盘符<': '>{t("filterAllDrives")}<',
        '>所有类型<': '>{t("filterAllTypes")}<',
        '>Directory (文件夹)<': '>{t("filterDir")}<',
        '>ISO (光盘镜像)<': '>{t("filterIso")}<',
        '>默认排序<': '>{t("filterSortDefault")}<',
        '>文件名 (A-Z)<': '>{t("filterSortNameAsc")}<',
        '>文件名 (Z-A)<': '>{t("filterSortNameDesc")}<',
        '>Steam评分 (高到低)<': '>{t("filterSortSteamDesc")}<',
        '>Steam评分 (低到高)<': '>{t("filterSortSteamAsc")}<',
        '>游戏大小 (大到小)<': '>{t("filterSortSizeDesc")}<',
        '>游戏大小 (小到大)<': '>{t("filterSortSizeAsc")}<',
        '>平铺<': '>{t("filterViewTile")}<',
        '>详细<': '>{t("filterViewDetail")}<'
    })

    process_component("FullIndexPanel.tsx", {
        '>所有唯一游戏库索引<': '>{t("allTitle")}<',
        '>完整展示盘库的每一个对象，支持无级排序和高级检索。<': '>{t("allSubtitle")}<',
        '>序号<': '>{t("colIndex")}<',
        '>游戏目录名称<': '>{t("colName")}<',
        '>Steam 评价<': '>{t("colSteamRating")}<',
        '>游戏类型<': '>{t("colGenre")}<',
        '>文件<': '>{t("colFile")}<',
        '>存储盘路径<': '>{t("colPath")}<',
        '>状态标记<': '>{t("colStatus")}<',
        '>操作<': '>{t("colAction")}<',
        '>完全重复<': '>{t("tagExactDup")}<',
        '>多版本<': '>{t("tagVersionDup")}<',
        '>上一页<': '>{t("btnPrevPage")}<',
        '>下一页<': '>{t("btnNextPage")}<',
        '共 {totalItems} 个结果': '{t("paginationTotal", { total: totalItems })}',
        '当前显示 {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} 个游戏，共 {totalItems} 个结果': '{t("paginationInfo", { start: (currentPage - 1) * pageSize + 1, end: Math.min(currentPage * pageSize, totalItems), total: totalItems })}',
        '没有找到任何符合条件的游戏。': '{t("noResults")}',
        'title="在资源管理器中打开"': 'title={t("openInExplorer")}'
    })
    
    process_component("GameDetailRow.tsx", {
        'title="在资源管理器中打开"': 'title={t("openInExplorer")}',
        'title="点击复制路径"': 'title={t("copyPathMsg")}',
        '>大小: <strong>': '>{t("sizeLabel")} <strong>',
        '>物理位置: <strong>': '>{t("physicalPathLabel")} <strong>',
        '>类型: <strong': '>{t("genreLabel")} <strong',
        '>暂无评分<': '>{t("noRating")}<',
        '>发行: <span': '>{t("releaseLabel")} <span',
        '>创建: <span': '>{t("createdLabel")} <span',
        '>未知<': '>{t("unknown")}<',
        'title={`Steam好评率: ${game.positive_percent}% / 总评论数: ${game.total_reviews}`}': 'title={t("steamRatingHover", { percent: game.positive_percent, total: game.total_reviews })}'
    })

    process_component("PosterWall.tsx", {
        '>独立海报墙 (Poster Wall)<': '>{t("wallTitlePosters")}<',
        '>已安装游戏库<': '>{t("wallTitleInstalled")}<',
        '>点击卡片或详情列表，可直接在资源管理器中打开游戏目录。<': '>{t("wallSubtitle")}<',
        '共 {totalItems} 个结果': '{t("paginationTotal", { total: totalItems })}',
        '当前显示 {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} 个游戏，共 {totalItems} 个结果': '{t("paginationInfo", { start: (currentPage - 1) * pageSize + 1, end: Math.min(currentPage * pageSize, totalItems), total: totalItems })}',
        '>上一页<': '>{t("btnPrevPage")}<',
        '>下一页<': '>{t("btnNextPage")}<',
        '没有找到任何符合条件的游戏。': '{t("noResults")}',
        '该视图下暂无游戏': '{t("wallNoGames")}'
    })

    process_component("DuplicatesPanel.tsx", {
        '>完全重复与版本冗余分析<': '>{t("dupTitle")}<',
        '>基于文件夹名智能分组，精准定位重复浪费空间的文件。<': '>{t("dupSubtitle")}<',
        '>警告：检测到完全重复的文件夹名称！这些文件浪费了您的物理存储空间。<': '>{t("dupExactWarning")}<',
        '>疑似同一个游戏的不同版本或 Repack，建议核对并保留一个最新版。<': '>{t("dupVersionInfo")}<',
        '组 {idx + 1} (完全重复: {group.base_name})': '{t("dupGroupExact", { index: idx + 1, name: group.base_name })}',
        '组 {idx + 1} (多版本: {group.base_name})': '{t("dupGroupVersion", { index: idx + 1, name: group.base_name })}',
        '>展开<': '>{t("actionExpand")}<',
        '>收起<': '>{t("actionCollapse")}<',
        '>文件<': '>{t("colFile")}<',
        '>存储盘路径<': '>{t("colPath")}<',
        '>操作<': '>{t("colAction")}<',
        'title="在资源管理器中打开"': 'title={t("openInExplorer")}'
    })

    process_component("FranchisesPanel.tsx", {
        '>游戏系列与续作合集<': '>{t("franTitle")}<',
        '>通过相似度算法自动提取的系列或续作，帮助你按系列整理和回顾经典。<': '>{t("franSubtitle")}<',
        '{group.franchise_name} 系列 (包含 {group.games.length} 部)': '{t("franGroup", { name: group.franchise_name, count: group.games.length })}',
        '>展开<': '>{t("actionExpand")}<',
        '>收起<': '>{t("actionCollapse")}<',
        '>文件<': '>{t("colFile")}<',
        '>存储盘路径<': '>{t("colPath")}<',
        '>操作<': '>{t("colAction")}<',
        'title="在资源管理器中打开"': 'title={t("openInExplorer")}'
    })

if __name__ == "__main__":
    main()
