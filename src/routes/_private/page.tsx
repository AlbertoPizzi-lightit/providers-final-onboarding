import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { privateApi } from "@/config/api";
import { API_URL, type Clinic, type Data } from "@/utils";
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
const getData = async () => {
  const request = await privateApi.get(API_URL.providersApiUrl);

  const data: Record<"data", Data[]> = request.data;

  const processedData = data.data.map(
    ({ clinics, gender, name: doctorName, profile_pic: image, specialty }) => {
      return {
        image,
        doctorName,
        doctorSpecialty: specialty.name,
        medicalCenter: clinics[0].name,
        locationQty: clinics.length,
        clinics,
        gender,
      };
    },
  );

  return processedData;
};

const ProvidersPage = () => {
  const [providerBannerInfo, setProviderBannerInfo] = useState<ProviderBanner[]>([]);
  const [filteredProviderBannerInfo, setFilteredProviderBannerInfo] = useState<
    ProviderBanner[] | null
  >(null);

  const isFiltered = filteredProviderBannerInfo !== null;

  useEffect(() => {
    let ignore = false;
    getData().then((providerBannerData) => {
      if (!ignore) {
        setProviderBannerInfo(providerBannerData);
      }
    });

    return () => {
      ignore = true;
    };
  }, []);

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
