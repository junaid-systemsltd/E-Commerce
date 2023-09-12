import { ReactNode } from "react";

export default function ListGroup({
  children,
  variant,
}: {
  children: ReactNode;
  variant?: "flush";
}) {
  return (
    <ul className={`list-group ${variant ? "list-group-flush" : ""} `}>
      {children}
    </ul>
  );
}
