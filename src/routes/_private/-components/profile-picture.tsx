import { useTranslation } from "react-i18next";

export const ProfilePicture = () => {
  const { t } = useTranslation();

  return (
    <div className="flex size-15 items-center justify-center rounded-full bg-button text-white">
      {t("providers.profile.name")}
    </div>
  );
};
