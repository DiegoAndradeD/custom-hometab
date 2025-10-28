import { DateTimeVariant } from "../enums";

export const DATE_TIME_FORMAT_OPTIONS: Record<
  DateTimeVariant,
  Intl.DateTimeFormatOptions
> = {
  [DateTimeVariant.TIME_12H]: {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  },
  [DateTimeVariant.TIME_24H]: {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  },
  [DateTimeVariant.TIME_WITH_SECONDS]: {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  },
  [DateTimeVariant.DATE_SHORT]: {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  },
  [DateTimeVariant.DATE_LONG]: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  [DateTimeVariant.DATE_WITH_DAY]: {
    weekday: "long",
    month: "numeric",
    day: "numeric",
  },
  [DateTimeVariant.DATETIME]: {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  },
  [DateTimeVariant.DATETIME_WITH_SECONDS]: {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  },
};
