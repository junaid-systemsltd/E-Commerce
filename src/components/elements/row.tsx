import { ReactNode } from "react";

interface RowProps {
  children?: ReactNode;
  className?: string;
}

export default function Row({ children, className = "" }: RowProps) {
  return <div className={`row ${className}`}>{children}</div>;
}
