import { type SubmitHandler, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button, ErrorMessage, Input, Label, PasswordInput } from "@/components";
import { getLoginPayloadSchema, type LoginPayload, useLogin } from "@/services";
import { setAuthStoreToken } from "@/stores";
import { handleAxiosFieldErrors } from "@/utils";

export const RegisterForm = () => {
  const { t } = useTranslation();

  const loginMutation = useLogin();

  const router = useRouter();
  const search = useSearch({ from: "/(public)/_guest/signup/" });
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(getLoginPayloadSchema()),
  });

  const onSubmit: SubmitHandler<LoginPayload> = (data) => {
    loginMutation.mutate(data, {
      onSuccess: async ({ data: { authToken } }) => {
        toast.success(t("login.success"));
        setAuthStoreToken(authToken);
        await router.invalidate();
        await navigate({ to: search.redirect || "/" });
      },
      onError: (error) => {
        handleAxiosFieldErrors<LoginPayload>(error, setError, t("login.error"));
      },
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="fullName">{t("form.fullName")}</Label>

        <Input {...register("fullName")} />

        <ErrorMessage errorMessage={errors?.fullName?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">{t("form.email")}</Label>

        <Input {...register("email")} />

        <ErrorMessage errorMessage={errors?.email?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">{t("form.password")}</Label>
        </div>

        <PasswordInput {...register("password")} />

        <ErrorMessage errorMessage={errors?.password?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">{t("Confirm Password")}</Label>
        </div>

        <PasswordInput {...register("password")} />

        <ErrorMessage errorMessage={errors?.password?.message} />
      </div>

      <Button className="w-full" type="submit">
        {t("register")}
      </Button>

      <p className="text-center text-sm">
        <Trans
          components={{
            Link: <Link className="underline underline-offset-4 hover:opacity-80" to="/signup" />,
          }}
          i18nKey="login.noAccount"
        />
      </p>
    </form>
  );
};
