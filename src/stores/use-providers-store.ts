import { create } from "zustand";

export type ProviderStoreState = {
  name: string | null;
};

const useProvidersStore = create<ProviderStoreState>()((set) => {
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
