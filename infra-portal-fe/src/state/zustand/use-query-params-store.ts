import { create } from "zustand";

// Zustand store
type Store = {
  countryCode: string | null;
  setCountryCode: (countryCode: string) => void;
};

export const useQueryParamsStore = create<Store>((set) => ({
  countryCode: null,
  setCountryCode: (countryCode) => set({ countryCode }),
}));
