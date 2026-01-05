import { type SubmitHandler, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { Button, ErrorMessage, Input, Label, PasswordInput } from "@/components";
import { getLoginPayloadSchema, type LoginPayload, useLogin } from "@/services";
import { setAuthStoreToken } from "@/stores";
import { handleAxiosFieldErrors } from "@/utils";

export const LoginForm = () => {
  const { t } = useTranslation();

  const loginMutation = useLogin();

  const router = useRouter();
  const search = useSearch({ from: "/(public)/_guest/login/" });
  const navigate = useNavigate();

  const {
    formState: { errors, isLoading, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm({
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
        if ((error as AxiosError).status === 401) {
          setError("email", { type: "backend", message: " " });
          setError("password", { type: "backend", message: t("login.invalidCredentials") });
        } else {
          handleAxiosFieldErrors<LoginPayload>(error, setError, t("login.error"));
        }
      },
    });
  };

  return (
    <>
      <article>
        <h1 className="py-1 text-3xl font-medium">{t("login.title")}</h1>

        <p className="mb-6 text-sm text-gray-500">{t("login.subtitle")}</p>
      </article>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{t("form.email")}</Label>

          <Input {...register("email")} error={typeof errors?.email?.message === "string"} />

          <ErrorMessage errorMessage={errors?.email?.message} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t("form.password")}</Label>
          </div>

          <PasswordInput
            {...register("password")}
            error={typeof errors?.password?.message === "string"}
          />

          <ErrorMessage errorMessage={errors?.password?.message} />
        </div>

        <Button className="w-full" isLoading={isLoading || isSubmitting} size="lg" type="submit">
          {t("login.login")}
        </Button>

        <p className="text-center text-sm">
          <Trans
            components={{
              Link: (
                <Link className="underline underline-offset-4 hover:opacity-80" to="/register" />
              ),
            }}
            i18nKey="login.noAccount"
          />
        </p>
      </form>
    </>
  );
};
