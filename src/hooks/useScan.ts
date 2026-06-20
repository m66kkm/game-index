import { useState, useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import type { ProgressPayload } from "../types";

interface UseScanOptions {
  onComplete?: () => void;
}

export function useScan({ onComplete }: UseScanOptions = {}) {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanMessage, setScanMessage] = useState<string>("");
  const [scanLogs, setScanLogs] = useState<string[]>([]);

  // Start background database scanning
  const startScan = useCallback(async () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanMessage("初始化扫描任务...");
    setScanLogs(["[SYSTEM] 开始扫描任务..."]);

    let unlisten: (() => void) | null = null;
    try {
      // Listen for progress updates
      unlisten = await listen<ProgressPayload>("scan-progress", (event) => {
        const payload = event.payload;
        const progress = Math.round((payload.current / (payload.total || 1)) * 100);
        setScanProgress(progress);
        setScanMessage(payload.message);
        setScanLogs((prev) => [...prev, `[${payload.step.toUpperCase()}] ${payload.message}`]);
      });

      // Invoke scanner
      await invoke("start_scan_command");
      setScanLogs((prev) => [...prev, "[SYSTEM] 扫描成功完成！"]);
    } catch (e) {
      console.error("扫描发生错误:", e);
      setScanLogs((prev) => [...prev, `[ERROR] 扫描失败: ${e}`]);
    } finally {
      setIsScanning(false);
      if (unlisten) {
        unlisten();
      }
      onComplete?.();
    }
  }, [onComplete]);

  // Cancel ongoing scan
  const cancelScan = useCallback(async () => {
    try {
      await invoke("cancel_scan_command");
      setScanLogs((prev) => [...prev, "[SYSTEM] 用户取消了扫描任务"]);
    } catch (e) {
      console.error("取消扫描失败:", e);
    }
  }, []);

  const clearLogs = useCallback(() => {
    setScanLogs([]);
  }, []);

  return {
    isScanning,
    scanProgress,
    scanMessage,
    scanLogs,
    startScan,
    cancelScan,
    clearLogs
  };
}
