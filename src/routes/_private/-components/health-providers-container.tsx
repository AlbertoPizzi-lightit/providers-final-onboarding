import type { Dispatch, SetStateAction } from "react";

import type { ProviderBanner } from "../page";
import { FilterContainer } from "./filter-container";

type HealthCareProvidersContainerProps = {
  providerBannerInfo: ProviderBanner[];
  setProviderBannerInfo: Dispatch<SetStateAction<ProviderBanner[] | null>>;
  filteredProviderBannerInfo: ProviderBanner[] | null;
};

export const HealthProvidersContainer = ({
  filteredProviderBannerInfo,
  providerBannerInfo,
  setProviderBannerInfo,
}: HealthCareProvidersContainerProps) => {
  const numberOfProviders = () => {
    return filteredProviderBannerInfo !== null
      ? filteredProviderBannerInfo.length
      : providerBannerInfo.length;
  };

  return (
    <div>
      <article className="flex flex-col justify-center">
        <h1 className="text-left text-3xl font-semibold">Healthcare Providers</h1>

        <p className="text-description-text pt-1 text-left text-lg">
          Find and connect with healthcare professionals in your area
        </p>
      </article>

      <FilterContainer
        filteredProviderBannerInfo={filteredProviderBannerInfo}
        providerBannerInfo={providerBannerInfo}
        setProviderBannerInfo={setProviderBannerInfo}
      />

      <div className="flex">
        <div className="text-description-text px-0 pt-5">{numberOfProviders()} providers found</div>
      </div>
    </div>
  );
};
