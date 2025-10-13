import { createPersistedStore } from "../utils";

interface UIStoreState {
  isSearchBarActive: boolean;
}

interface UIStoreActions {
  toggleSearchBar: () => void;
}

const widgetsStoreInitialState: UIStoreState = {
  isSearchBarActive: true,
};

const useWidgetsStore = createPersistedStore<UIStoreState & UIStoreActions>(
  (set, get) => ({
    ...widgetsStoreInitialState,
    toggleSearchBar: () => {
      const { isSearchBarActive } = get();
      set({ isSearchBarActive: !isSearchBarActive });
    },
  }),
  "ui-storage"
);

export default useWidgetsStore;
