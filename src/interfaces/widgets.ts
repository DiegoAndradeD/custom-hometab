import type { TInputVariant } from "../components/ui/input";
import type { IBookmark } from "./index";

export interface ISearchBarWidget {
  isSearchBarActive: boolean;
  variant: TInputVariant;
}

export interface IDateAndTimeWidget {
  isDateAndTimeActive: boolean;
}

export interface IBookmarksWidget {
  isBookmarksActive: boolean;
  items: IBookmark[];
  selectedBookmark?: IBookmark;
}
