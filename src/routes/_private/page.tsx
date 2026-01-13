import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { providerFiltersValidation, useDebounce, useProviderFilters } from "@/hooks";
import { PROVIDER_FILTER_KEYS, useProviders } from "@/services";
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
  const { filters } = useProviderFilters(Route.id);
  const debouncedName = useDebounce(filters.name, 500);

  const { data: allProvidersData } = useProviders();

  const { data: providerBannerInfo, isLoading } = useProviders({
    filter: {
      [PROVIDER_FILTER_KEYS.NAME]: debouncedName,
      [PROVIDER_FILTER_KEYS.SPECIALTY_ID]: filters.specialty_id,
      [PROVIDER_FILTER_KEYS.GENDER]: filters.gender,
      [PROVIDER_FILTER_KEYS.CLINIC_ID]: filters.clinic_id,
    },
  });

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
          allProvidersForFilters={allProvidersData?.data ?? []}
          isLoading={isLoading}
          providerBannerInfo={providerBannerInfo?.data ?? []}
        />
      </TableHeaderContainer>

      <ProvidersContainer>
        {(providerBannerInfo?.data ?? []).map((doctorData, index) => {
          return <ProviderBanner key={doctorData.name + index} {...doctorData} />;
        })}
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
