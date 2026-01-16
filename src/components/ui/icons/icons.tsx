import type { ComponentPropsWithoutRef, ElementType, JSX, PropsWithChildren } from "react";
import type { IconProps } from "@iconify/react";
import { Icon, loadIcons } from "@iconify/react";
import { tv } from "tailwind-variants";

import { SIZE, type Size, type Styled } from "@/types/styles";

const PHOSPHOR_PREFIX = "ph:";

type SVGProps = ComponentPropsWithoutRef<"svg">;

const AVAILABLE_ICONIFY_ICONS = {
  Check: "check",
  ChevronDown: "chevron-down",
  ChevronRight: "chevron-right",
  ChevronUp: "chevron-up",
  ChevronLeft: "chevron-left",
  Circle: "circle",
  Home: "home",
  LoaderCircle: "loader-circle",
  LogOut: "log-out",
  MoreHorizontal: "more-horizontal",
  Menu: "menu",
  Search: "magnifying-glass",
  Slash: "slash",
  Close: "x",
  Plus: "plus",
  Eye: "eye",
  EyeOff: "eye-off",
  Lock: "lock",
  MapPin: "map-pin",
};

export const initializeIcons = () => {
  return loadIcons(
    Object.values(AVAILABLE_ICONIFY_ICONS).map((icon) => {
      return `${PHOSPHOR_PREFIX}${icon}`;
    }),
  );
};

const iconsVariants = tv({
  slots: {
    icon: "size-4",
    wrapper: "flex shrink-0 flex-row items-center justify-center",
  },
  variants: {
    size: {
      [SIZE.X_SMALL]: { wrapper: "size-4" },
      [SIZE.SMALL]: { wrapper: "size-5" },
      [SIZE.MEDIUM]: { wrapper: "size-6" },
      [SIZE.LARGE]: { wrapper: "size-9" },
      [SIZE.X_LARGE]: { wrapper: "size-10" },
    },
  },
});

const { icon, wrapper } = iconsVariants();

type IconifyIconProps = Omit<IconProps, "icon">;

const iconifyIcons = Object.fromEntries(
  Object.entries(AVAILABLE_ICONIFY_ICONS).map(([key, value]) => {
    return [
      key,
      ({ className, ...rest }: IconifyIconProps) => {
        return (
          <Icon className={icon({ className })} icon={`${PHOSPHOR_PREFIX}${value}`} {...rest} />
        );
      },
    ];
  }),
) as Record<keyof typeof AVAILABLE_ICONIFY_ICONS, (props: IconifyIconProps) => JSX.Element>;

export const Icons = {
  ...iconifyIcons,
  LogoIcon: ({ className, ...props }: SVGProps) => {
    return (
      <svg
        className={className}
        fill="none"
        height="40"
        viewBox="0 0 25 25"
        width="40"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M10.0757 0C10.5431 0 10.9511 0.254404 11.1694 0.631836H11.3384C12.3845 0.631836 13.2329 1.47934 13.2329 2.52539V8.20801C13.5813 8.20821 13.8668 8.49097 13.8354 8.83789C13.6887 10.4486 12.9826 11.9661 11.8296 13.1191C10.9842 13.9644 9.94312 14.5693 8.81299 14.8896V16.416C8.8128 17.2404 8.28564 17.9421 7.55029 18.2021C7.57719 20.0095 9.05096 21.4667 10.8647 21.4668C12.6954 21.4668 14.1792 19.982 14.1792 18.1514V15.626C14.1794 13.6212 15.8052 11.9961 17.8101 11.9961C19.8149 11.9961 21.4397 13.6212 21.4399 15.626V17.1543C22.1756 17.4143 22.7026 18.1167 22.7026 18.9414C22.7024 19.9873 21.855 20.8349 20.8091 20.835C19.7631 20.835 18.9147 19.9874 18.9146 18.9414C18.9146 18.1168 19.4417 17.4143 20.1772 17.1543V15.626C20.177 14.3186 19.1175 13.2588 17.8101 13.2588C16.5026 13.2588 15.4421 14.3185 15.4419 15.626V18.1514C15.4419 20.6794 13.3928 22.7295 10.8647 22.7295C8.35361 22.7294 6.31459 20.707 6.2876 18.2021C5.55197 17.9422 5.02509 17.2406 5.0249 16.416V14.8896C3.8948 14.5693 2.85372 13.9644 2.0083 13.1191C0.855309 11.9661 0.149228 10.4486 0.00244141 8.83789C-0.0289152 8.4909 0.256522 8.20811 0.60498 8.20801H0.63623V2.73633C0.63623 1.60311 1.55373 0.683649 2.68604 0.683594H2.86865C3.105 0.274779 3.54733 0 4.05322 0C4.80804 0.000117235 5.41943 0.61273 5.41943 1.36816C5.41932 2.1235 4.80798 2.73621 4.05322 2.73633C3.54728 2.73633 3.10498 2.46064 2.86865 2.05176H2.68604C2.30863 2.05181 2.00244 2.35861 2.00244 2.73633V8.20801H2.6001C2.94868 8.20801 3.22617 8.49236 3.28564 8.83594C3.41444 9.58057 3.77049 10.2739 4.31201 10.8154C5.00335 11.5066 5.94093 11.8944 6.91846 11.8945C7.89624 11.8945 8.8345 11.5067 9.52588 10.8154C10.0675 10.2739 10.4234 9.58057 10.5522 8.83594C10.6117 8.49238 10.8892 8.20801 11.2378 8.20801H11.9702V2.52539C11.9702 2.17673 11.6871 1.89453 11.3384 1.89453H11.1694C10.9511 2.27178 10.5429 2.52539 10.0757 2.52539C9.37828 2.52538 8.81299 1.96008 8.81299 1.2627C8.81301 0.565326 9.37829 6.1422e-06 10.0757 0ZM20.8091 18.3096C20.4604 18.3096 20.1772 18.5927 20.1772 18.9414C20.1774 19.2899 20.4605 19.5723 20.8091 19.5723C21.1576 19.5722 21.4397 19.2899 21.4399 18.9414C21.4399 18.5927 21.1577 18.3096 20.8091 18.3096ZM6.2876 16.416C6.28784 16.7644 6.57008 17.0467 6.91846 17.0469C7.26701 17.0469 7.55005 16.7645 7.55029 16.416V15.1533H6.2876V16.416ZM1.37842 9.4707C1.61439 10.5058 2.1382 11.4629 2.90088 12.2256C3.96641 13.2911 5.41159 13.8895 6.91846 13.8896C8.42553 13.8896 9.87139 13.2912 10.937 12.2256C11.6996 11.4629 12.2235 10.5058 12.4595 9.4707H11.7046C11.4832 10.3097 11.0436 11.0838 10.4194 11.708C9.49113 12.6363 8.23126 13.1572 6.91846 13.1572C5.60586 13.1571 4.34666 12.6362 3.41846 11.708C2.79422 11.0837 2.35375 10.3098 2.13232 9.4707H1.37842Z"
          fill="white"
        />
      </svg>
    );
  },
} as const;

type IconWrapperProps<TElement extends ElementType> = {
  size?: Size;
  as?: TElement;
} & Styled &
  PropsWithChildren;

export const IconWrapper = <TElement extends ElementType = "div">({
  as,
  children,
  className,
  size = SIZE.MEDIUM,
  ...rest
}: Omit<ComponentPropsWithoutRef<TElement>, keyof IconWrapperProps<TElement>> &
  IconWrapperProps<TElement>) => {
  const Component = as ?? "div";

  return (
    <Component className={wrapper({ size, className })} {...rest}>
      {children}
    </Component>
  );
};
