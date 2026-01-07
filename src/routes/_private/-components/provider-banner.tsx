import { LocationIcon } from "./icons/location-icon";

type ProviderBannerProps = {
  image?: string;
  doctorName: string;
  doctorSpecialty: string;
  medicalCenter: string;
  locationQty?: number;
  alt?: string;
};

export const ProviderBanner = ({
  alt,
  doctorName,
  doctorSpecialty,
  image,
  locationQty,
  medicalCenter,
}: ProviderBannerProps) => {
  return (
    <div className="bg-banner-bg border-b-border border-border flex h-122 min-w-88 flex-col overflow-hidden rounded-xl border">
      <div className="relative">
        <div className="h-55 w-88">
          <img alt={alt} className="aspect-square h-full w-full object-cover" src={image} />
        </div>
      </div>

      <div className="flex grow flex-col items-start justify-between">
        <article className="p-5">
          <h2 className="text-text-default text-2xl">{doctorName}</h2>

          <h3 className="text-description-text text-xl">{doctorSpecialty}</h3>
        </article>

        <article className="flex gap-2 px-5 py-1.5">
          <div className="h-full px-0 py-1">
            <LocationIcon className="text-disabled-text" />
          </div>

          <article className="text-description-text flex flex-col">
            <p>{medicalCenter}</p>

            <p>+ {locationQty} more locations</p>
          </article>
        </article>

        <div className="justify-center p-5">
          <button
            aria-label="This is a view details button"
            className="bg-button text-base-background h-10 w-75 rounded-md border-0"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
