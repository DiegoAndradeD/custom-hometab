import { DateTimeVariant } from "../enums";
import type {
  IBookmarksWidget,
  IDateAndTimeWidget,
  ISearchBarWidget,
} from "../interfaces/widgets";
import { createPersistedStore } from "../utils";

interface UIStoreState {
  searchBarWidget: ISearchBarWidget;
  dateAndTimeWidget: IDateAndTimeWidget;
  bookmarksWidget: IBookmarksWidget;
}

type WidgetKeys = keyof UIStoreState;

interface UIStoreActions {
  updateWidget: <K extends WidgetKeys>(
    key: K,
    newProps: Partial<UIStoreState[K]>
  ) => void;
}

export const widgetsStoreInitialState: UIStoreState = {
  searchBarWidget: {
    isSearchBarActive: true,
    variant: "default",
  },
  dateAndTimeWidget: {
    isDateAndTimeActive: true,
    variant: DateTimeVariant.DATETIME_WITH_SECONDS,
  },
  bookmarksWidget: {
    isBookmarksActive: true,
    items: [],
    selectedBookmark: undefined,
  },
};

const useWidgetsStore = createPersistedStore<UIStoreState & UIStoreActions>(
  (set) => ({
    ...widgetsStoreInitialState,

    updateWidget: (key, newProps) => {
      set((state) => ({
        [key]: {
          ...state[key],
          ...newProps,
        },
      }));
    },
  }),
  "ui-storage"
);

export default useWidgetsStore;
