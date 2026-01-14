import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { useDebounce, useProviderFilters } from "@/hooks";
import {
  PROVIDER_FILTER_KEYS,
  providerFiltersValidation,
  useInfiniteProviders,
  useProviders,
} from "@/services";
import {
  Header,
  HealthProvidersContainer,
  Logo,
  Nav,
  ProfilePicture,
  ProviderBanner,
  ProvidersContainer,
  TableHeaderContainer,
} from "./-components";

const ProvidersPage = () => {
  const { t } = useTranslation();
  const { filters } = useProviderFilters(Route.id);
  const debouncedName = useDebounce(filters.name, 500);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data: allProvidersData } = useProviders();

  const {
    data: providerBannerInfo,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteProviders({
    filter: {
      [PROVIDER_FILTER_KEYS.NAME]: debouncedName,
      [PROVIDER_FILTER_KEYS.SPECIALTY_ID]: filters.specialty_id,
      [PROVIDER_FILTER_KEYS.GENDER]: filters.gender,
      [PROVIDER_FILTER_KEYS.CLINIC_ID]: filters.clinic_id,
    },
  });

  const allProviders =
    providerBannerInfo?.pages.flatMap((page) => {
      return page.data;
    }) ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
      },
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="mx-auto my-0 flex h-full max-w-6xl flex-col pt-25">
      <Header>
        <Nav>
          <Logo />

          <ProfilePicture />
        </Nav>
      </Header>

      <TableHeaderContainer>
        <HealthProvidersContainer
          filterSourceProviders={allProvidersData?.data ?? []}
          isLoading={isLoading}
          providerBannerInfo={allProviders}
        />
      </TableHeaderContainer>

      <ProvidersContainer>
        {allProviders.map((doctorData, index) => {
          return <ProviderBanner key={doctorData.name + index} {...doctorData} />;
        })}
        <div className="h-10 w-full" ref={loadMoreRef} />
        {isFetchingNextPage ? (
          <div className="col-span-full text-center text-text-default">
            {t("providers.isLoading.more")}
          </div>
        ) : null}
      </ProvidersContainer>
    </div>
  );
};

export const Route = createFileRoute("/_private/")({
  component: ProvidersPage,
  validateSearch: z.object({
    ...providerFiltersValidation.shape,
  }),
});
