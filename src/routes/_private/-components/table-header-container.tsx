import type { PropsWithChildren } from "react";

export const TableHeaderContainer = ({ children }: PropsWithChildren) => {
  return <section className="max-w-6xl p-6">{children}</section>;
};
