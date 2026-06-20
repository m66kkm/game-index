import { CheckCircle2 } from "lucide-react";

interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  if (!message) return null;
  
  return (
    <div className="toast-notice">
      <CheckCircle2 size={16} style={{ display: "inline-block", marginRight: "0.5rem", verticalAlign: "middle" }} />
      {message}
    </div>
  );
}
