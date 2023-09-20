import { ReactNode } from "react";

export default function ListGroupItem({ children }: { children: ReactNode }) {
  return <li className="list-group-item"> {children} </li>;
}
