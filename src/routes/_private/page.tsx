import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { type Providers, useProviders } from "@/services";
import {
  Header,
  HealthProvidersContainer,
  Logo,
  Nav,
  ProfilePicture,
  ProvidersContainer,
  TableHeaderContainer,
} from "./-components";

const ProvidersPage = () => {
  const { data: providerBannerInfo, isLoading, isSuccess } = useProviders({});

  console.log(providerBannerInfo);

  const [filteredProviderBannerInfo, setFilteredProviderBannerInfo] = useState<Providers[] | null>(
    null,
  );

  const isFiltered = filteredProviderBannerInfo !== null;

  console.log(providerBannerInfo);

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
          filteredProviderBannerInfo={filteredProviderBannerInfo}
          providerBannerInfo={providerBannerInfo?.data ?? []}
          setProviderBannerInfo={setFilteredProviderBannerInfo}
        />
      </TableHeaderContainer>

      <ProvidersContainer>
        {/* {(isFiltered ? filteredProviderBannerInfo : providerBannerInfo?.data).map((doctorData, index) => {
          return <ProviderBanner key={doctorData.doctorName + index} {...doctorData} />;
        })} */}
      </ProvidersContainer>
    </div>
  );
};

export const Route = createFileRoute("/_private/")({
  component: ProvidersPage,
});
