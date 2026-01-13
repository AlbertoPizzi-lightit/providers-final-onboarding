import { useTranslation } from "react-i18next";

import { LogoIcon } from "./icons/logo-icon";

export const Logo = () => {
  const { t } = useTranslation();

  return (
    <div className="flex gap-2.5">
      <div className="flex size-12 items-center justify-center rounded-md bg-button p-2">
        <LogoIcon className="text-base-background" />
      </div>

      <div className="text-left text-text-default">
        <h2 className="text-2xl">{t("providers.logo.title")}</h2>

        <p className="text-sm">{t("providers.logo.description")}</p>
      </div>
    </div>
  );
};
