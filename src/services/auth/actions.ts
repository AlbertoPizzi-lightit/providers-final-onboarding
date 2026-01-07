import { useMutation } from "@tanstack/react-query";
import i18n from "i18next";
import { toast } from "sonner";

import type { UseMutationProps } from "@/services/types";
import { mutations } from "./factories";

export const useLogin = (props?: UseMutationProps<typeof mutations.login>) => {
  return useMutation({
    mutationFn: mutations.login,
    onError: () => {
      toast.error(i18n.t("login.errors.failedLogin"));
    },
    ...props,
  });
};
