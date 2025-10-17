import type { TInputVariant } from "../components/ui/input";

export interface ISearchBarWidget {
  isSearchBarActive: boolean;
  variant: TInputVariant;
}

export interface IDateAndTimeWidget {
  isDateAndTimeActive: boolean;
}
