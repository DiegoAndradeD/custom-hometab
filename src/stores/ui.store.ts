import { create } from "zustand";

interface UIStoreState {
  wallpaper: string;
  backdrop: number;
  isBackdropActive: boolean;
}

interface UIStoreActions {
  setWallpaper: (wallpaper: string) => void;
  setBackdrop: (backdrop: number) => void;
  toggleBackdrop: () => void;
}

const uiStoreInitialState: UIStoreState = {
  wallpaper: "/wallpaper1.jpg",
  backdrop: 8,
  isBackdropActive: true,
};

const useUIStore = create<UIStoreState & UIStoreActions>((set, get) => ({
  ...uiStoreInitialState,
  setWallpaper: (wallpaper) => {
    set({ wallpaper });
  },
  setBackdrop: (backdrop) => {
    set({ backdrop });
  },
  toggleBackdrop: () => {
    const { isBackdropActive } = get();
    set({ isBackdropActive: !isBackdropActive });
  },
}));

export default useUIStore;
