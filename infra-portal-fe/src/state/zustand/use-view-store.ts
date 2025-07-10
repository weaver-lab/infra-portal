import { create } from "zustand";

// Enum for view states
export enum VIEWS {
  DEFAULT_LIST = "DEFAULT_LIST",
  ASSET_DETAIL = "ASSET_DETAIL",
}

// Zustand store
type Store = {
  view: VIEWS;
  selectedItemId: string | null;
  setView: (newView: VIEWS) => void;
  setSelectedItemId: (id: string) => void;
};

export const useViewStore = create<Store>((set) => ({
  view: VIEWS.DEFAULT_LIST, // initial view
  selectedItemId: null,
  showFilterPopup: false,
  setView: (newView) => set({ view: newView }),
  setSelectedItemId: (selectedItemId) => set({ selectedItemId }),
}));
