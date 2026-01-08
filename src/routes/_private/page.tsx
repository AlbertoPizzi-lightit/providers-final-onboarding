import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { getProviders } from "@/services/providers/api";
import { type Clinic } from "@/utils";
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

export type ProviderBanner = {
  image: string;
  doctorName: string;
  doctorSpecialty: string;
  medicalCenter: string;
  locationQty: number;
  clinics: Clinic[];
  gender: string;
};

const ProvidersPage = () => {
  const providers = getProviders();

  const [providerBannerInfo, setProviderBannerInfo] = useState<ProviderBanner[]>([]);
  const [filteredProviderBannerInfo, setFilteredProviderBannerInfo] = useState<
    ProviderBanner[] | null
  >(null);

  const isFiltered = filteredProviderBannerInfo !== null;

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
          providerBannerInfo={providerBannerInfo}
          setProviderBannerInfo={setFilteredProviderBannerInfo}
        />
      </TableHeaderContainer>

      <ProvidersContainer>
        {(isFiltered ? filteredProviderBannerInfo : providerBannerInfo).map((doctorData, index) => {
          return <ProviderBanner key={doctorData.doctorName + index} {...doctorData} />;
        })}
      </ProvidersContainer>
    </div>
  );
};

export const Route = createFileRoute("/_private/")({
  component: ProvidersPage,
});
