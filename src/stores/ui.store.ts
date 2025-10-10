import { create } from "zustand";

interface UIStoreState {
  wallpaper: string;
}

interface UIStoreActions {
  setWallpaper: (wallpaper: string) => void;
}

const uiStoreInitialState: UIStoreState = {
  wallpaper: "",
};

const useUIStore = create<UIStoreState & UIStoreActions>((set) => ({
  ...uiStoreInitialState,
  setWallpaper: (wallpaper) => {
    set({ wallpaper });
  },
}));

export default useUIStore;
