import { useTranslation } from "react-i18next";

import type { Providers } from "@/services";
import { FilterContainer } from "./filter-container";

type HealthCareProvidersContainerProps = {
  filterSourceProviders: Providers[];
  isLoading?: boolean;
  providerBannerInfo: Providers[];
};

export const HealthProvidersContainer = ({
  filterSourceProviders,
  isLoading = false,
  providerBannerInfo,
}: HealthCareProvidersContainerProps) => {
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

      <FilterContainer providers={filterSourceProviders} routeId="/_private/" />

      <div className="flex">
        <div className="px-0 pt-5 text-description-text">
          {isLoading ? (
            <>{t("providers.isLoading.loading")}</>
          ) : (
            <>
              {providerBannerInfo.length}{" "}
              {t("providers.healthcareProvidersContainer.providersFound")}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
