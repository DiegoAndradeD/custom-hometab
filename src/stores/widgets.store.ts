import type { ISearchBarWidget } from "../interfaces/searchBar-widget";
import { createPersistedStore } from "../utils";

interface UIStoreState {
  searchBarWidget: ISearchBarWidget;
}

interface UIStoreActions {
  setSearchBarWidget: (newProps: Partial<ISearchBarWidget>) => void;
}

const widgetsStoreInitialState: UIStoreState = {
  searchBarWidget: {
    isSearchBarActive: true,
    variant: "default",
  },
};

const useWidgetsStore = createPersistedStore<UIStoreState & UIStoreActions>(
  (set) => ({
    ...widgetsStoreInitialState,
    setSearchBarWidget: (newProps) => {
      set((state) => ({
        searchBarWidget: {
          ...state.searchBarWidget,
          ...newProps,
        },
      }));
    },
  }),
  "ui-storage"
);

export default useWidgetsStore;
