export enum DateTimeVariant {
  TIME_12H = "TIME_12H",
  TIME_24H = "TIME_24H",
  TIME_WITH_SECONDS = "TIME_WITH_SECONDS",
  DATE_SHORT = "DATE_SHORT",
  DATE_LONG = "DATE_LONG",
  DATE_WITH_DAY = "DATE_WITH_DAY",
  DATETIME = "DATETIME",
  DATETIME_WITH_SECONDS = "DATETIME_WITH_SECONDS",
}

export const DateTimeVariantStringRepresentation: Record<
  Uppercase<keyof typeof DateTimeVariant>,
  string
> = {
  TIME_12H: "Time12H",
  TIME_24H: "Time24H",
  TIME_WITH_SECONDS: "TimeWithSeconds",
  DATE_SHORT: "DateShort",
  DATE_LONG: "DateLong",
  DATE_WITH_DAY: "DateWithDay",
  DATETIME: "DateTime",
  DATETIME_WITH_SECONDS: "DateTimeWithSeconds",
};
