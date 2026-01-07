import type { PropsWithChildren } from "react";

export const Nav = ({ children }: PropsWithChildren) => {
  return (
    <nav className="mx-auto my-0 flex max-w-275 grow items-center justify-between">{children}</nav>
  );
};
