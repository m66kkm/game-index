// Helper for steam ratings color
export const getRatingColorClass = (desc?: string): string => {
  if (!desc) return "rating-none";
  const lower = desc.toLowerCase();
  if (lower.includes("overwhelmingly positive") || lower.includes("very positive")) {
    return "rating-high";
  }
  if (lower.includes("mostly positive") || lower.includes("positive")) {
    return "rating-good";
  }
  if (lower.includes("mixed")) {
    return "rating-mixed";
  }
  if (lower.includes("negative")) {
    return "rating-bad";
  }
  return "rating-none";
};

// Cover image resolver
export const getCoverUrl = (localCover?: string): string | null => {
  if (localCover) {
    // Use the custom cover protocol URL format for Tauri v2 on Windows
    const filename = localCover.replace("covers/", "");
    return `http://cover.localhost/${filename}`;
  }
  return null;
};

// Fallback gradient generator
export const getGradientsForName = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const grads = [
    "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)", // Dark Indigo
    "linear-gradient(135deg, #1e1b4b 0%, #311042 100%)", // Purple/Dark
    "linear-gradient(135deg, #311042 0%, #4c0519 100%)", // Rose/Maroon
    "linear-gradient(135deg, #022c22 0%, #064e3b 100%)", // Emerald Deep
    "linear-gradient(135deg, #1c1917 0%, #292524 100%)", // Stone
    "linear-gradient(135deg, #083344 0%, #164e63 100%)"  // Cyan Deep
  ];
  const index = Math.abs(hash) % grads.length;
  return grads[index];
};
