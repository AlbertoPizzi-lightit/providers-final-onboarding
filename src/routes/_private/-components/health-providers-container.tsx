import type { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import type { Providers } from "@/services";

// import { FilterContainer } from "./filter-container";

type HealthCareProvidersContainerProps = {
  providerBannerInfo: Providers[];
  setProviderBannerInfo: Dispatch<SetStateAction<Providers[] | null>>;
  filteredProviderBannerInfo: Providers[] | null;
};

export const HealthProvidersContainer = ({
  filteredProviderBannerInfo,
  providerBannerInfo,
  // setProviderBannerInfo,
}: HealthCareProvidersContainerProps) => {
  const numberOfProviders = () => {
    return filteredProviderBannerInfo !== null
      ? filteredProviderBannerInfo.length
      : providerBannerInfo.length;
  };
  const { t } = useTranslation();

  return (
    <div>
      <article className="flex flex-col justify-center">
        <h1 className="text-left text-3xl font-semibold">
          {t("providers.healthcareProvidersContainer.title")}
        </h1>

        <p className="pt-1 text-left text-lg text-description-text">
          {t("providers.healthcareProvidersContainer.description")}
        </p>
      </article>

      {/* <FilterContainer
        filteredProviderBannerInfo={filteredProviderBannerInfo}
        providerBannerInfo={providerBannerInfo}
        setProviderBannerInfo={setProviderBannerInfo}
      /> */}

      <div className="flex">
        <div className="px-0 pt-5 text-description-text">
          {numberOfProviders()} {t("providers.healthcareProvidersContainer.providersFound")}
        </div>
      </div>
    </div>
  );
};
