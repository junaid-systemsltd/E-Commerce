import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "light"
    | "dark"
    | "link";
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const {
    onClick,
    children,
    className,
    type = "button",
    disabled = false,
    variant = "primary",
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className}`}
    >
      {children}
    </button>
  );
}
