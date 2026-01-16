import type { PropsWithChildren } from "react";

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <nav className="fixed top-0 left-0 z-10 flex w-full flex-wrap border-b border-b-base-border bg-base-background p-6">
      {children}
    </nav>
  );
};
