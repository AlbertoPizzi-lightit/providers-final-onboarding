import { LogoIcon } from "./icons/logo-icon";

export const Logo = () => {
  return (
    <div className="flex gap-2.5">
      <div className="bg-button flex size-12 items-center justify-center rounded-md p-2">
        <LogoIcon className="text-base-background" />
      </div>

      <div className="text-text-default text-left">
        <h2 className="text-2xl">HealthConnect</h2>

        <p className="text-sm">Find your healthcare provider</p>
      </div>
    </div>
  );
};
