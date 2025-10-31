import { DateTimeVariant } from "../enums";
import type {
  IBookmarksWidget,
  IDateAndTimeWidget,
  INewsFeedWidget,
  ISearchBarWidget,
  IStickyNotesWidget,
  IWeatherWidget,
} from "../interfaces/widgets";
import { createPersistedStore } from "../utils";

interface UIStoreState {
  searchBarWidget: ISearchBarWidget;
  dateAndTimeWidget: IDateAndTimeWidget;
  bookmarksWidget: IBookmarksWidget;
  stickyNotesWidget: IStickyNotesWidget;
  newsFeedWidget: INewsFeedWidget;
  weatherWidget: IWeatherWidget;
}

export type WidgetKeys = keyof UIStoreState;

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
  stickyNotesWidget: {
    isStickyNotesActive: false,
    notes: [],
  },
  newsFeedWidget: {
    isNewsFeedActive: false,
  },
  weatherWidget: {
    isWeatherWidgetActive: false,
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
  "widget-storage"
);

export default useWidgetsStore;
