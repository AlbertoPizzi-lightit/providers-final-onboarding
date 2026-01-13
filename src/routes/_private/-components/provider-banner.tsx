import { useTranslation } from "react-i18next";

import type { Providers } from "@/services";
import { LocationIcon } from "./icons/location-icon";

export const ProviderBanner = ({ clinics, name, profilePic, specialty }: Providers) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-122 min-w-88 flex-col overflow-hidden rounded-xl border border-border border-b-border bg-banner-bg">
      <div className="relative">
        <div className="h-55 w-88">
          <img
            alt={`This is an picture of dr. ${name}`}
            className="aspect-square h-full w-full object-cover"
            src={profilePic}
          />
        </div>
      </div>

      <div className="flex grow flex-col items-start justify-between">
        <article className="p-5">
          <h2 className="text-2xl text-text-default">{name}</h2>

          <h3 className="text-xl text-description-text">{specialty.name}</h3>
        </article>

        <article className="flex gap-2 px-5 py-1.5">
          <div className="h-full px-0 py-1">
            <LocationIcon className="text-disabled-text" />
          </div>

          <article className="flex flex-col text-description-text">
            <p>{clinics[0].name}</p>

            <p>{`${t("providers.banner.plus")} ${clinics.length} ${t("providers.banner.locations")}`}</p>
          </article>
        </article>

        <div className="justify-center p-5">
          <button
            aria-label="This is a view details button"
            className="h-10 w-75 rounded-md border-0 bg-button text-base-background"
          >
            {t("providers.banner.viewDetails")}
          </button>
        </div>
      </div>
    </div>
  );
};
