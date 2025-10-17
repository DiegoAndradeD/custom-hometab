import type {
  IDateAndTimeWidget,
  ISearchBarWidget,
} from "../interfaces/widgets";
import { createPersistedStore } from "../utils";

interface UIStoreState {
  searchBarWidget: ISearchBarWidget;
  dateAndTimeWidget: IDateAndTimeWidget;
}

interface UIStoreActions {
  setSearchBarWidget: (newProps: Partial<ISearchBarWidget>) => void;
  setDateAndTimeWidget: (newProps: Partial<IDateAndTimeWidget>) => void;
}

const widgetsStoreInitialState: UIStoreState = {
  searchBarWidget: {
    isSearchBarActive: true,
    variant: "default",
  },
  dateAndTimeWidget: {
    isDateAndTimeActive: true,
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
    setDateAndTimeWidget: (newProps) => {
      set((state) => ({
        dateAndTimeWidget: {
          ...state.dateAndTimeWidget,
          ...newProps,
        },
      }));
    },
  }),
  "ui-storage"
);

export default useWidgetsStore;
