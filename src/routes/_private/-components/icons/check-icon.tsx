import type { SVGProps } from "react";

export const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
};
