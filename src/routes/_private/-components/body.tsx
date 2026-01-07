import type { PropsWithChildren } from "react";

export const Body = ({ children }: PropsWithChildren) => {
  return <body className="mx-auto my-0 flex h-full max-w-6xl flex-col pt-25">{children}</body>;
};
