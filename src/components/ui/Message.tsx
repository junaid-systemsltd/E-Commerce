import { ReactNode } from "react";

interface MessageProps {
  variant?: string;
  children: ReactNode;
}

export default function Message({ variant = "info", children }: MessageProps) {
  return (
    <div className={`alert alert-${variant}`} role="alert">
      {children}
    </div>
  );
}
