import { ReactNode } from "react";

type Range = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface ICol {
  xs?: Range;
  sm?: Range;
  md?: Range;
  lg?: Range;
  xl?: Range;
}

interface ColProps extends ICol {
  children: ReactNode;
}

export default function Col({ children, ...props }: ColProps) {
  return <div className={`col ${getClasses(props)}`}>{children}</div>;
}

function getClasses(props: ICol) {
  if (Object.keys(props).length === 0) return "";

  return Object.entries(props).reduce((classes: string, data: any) => {
    const [key, value] = data;
    return (classes += ` col-${key}-${value}`);
  }, "");
}
