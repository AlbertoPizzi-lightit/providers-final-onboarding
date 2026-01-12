import { create } from "zustand";

export type AuthStoreState = {
  name: string | null;
};

const useProvidersStore = create<AuthStoreState>()((set) => {
  return {
    name: "",
    setProviderName: (name: string) => {
      return set({ name });
    },
  };
});

export const getProviderName = () => {
  return useProvidersStore.getState();
};

export const useProvidersStoreToken = () => {
  return useProvidersStore((s) => {
    return s.name;
  });
};

export const setAuthStoreToken = (token: string | null) => {
  return useProvidersStore.setState(() => {
    return { token };
  });
};
