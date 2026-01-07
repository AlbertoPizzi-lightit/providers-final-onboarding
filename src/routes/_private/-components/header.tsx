import type { PropsWithChildren } from "react";

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <nav className="border-b-base-border bg-base-background fixed top-0 left-0 z-10 flex w-full flex-wrap border-b p-6">
      {children}
    </nav>
  );
};
