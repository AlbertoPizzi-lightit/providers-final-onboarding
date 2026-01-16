import type { PropsWithChildren } from "react";

export const ProvidersContainer = ({ children }: PropsWithChildren) => {
  return (
    <section className="written grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(350px,350px))] justify-center gap-10 pb-6">
      {children}
    </section>
  );
};
