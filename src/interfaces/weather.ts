export interface IWeatherDescription {
  value: string;
}

export interface ICurrentCondition {
  temp_C: string;
  FeelsLikeC: string;
  weatherDesc: IWeatherDescription[];
  humidity: string;
}

export interface IWeatherResponse {
  current_condition: ICurrentCondition[];
}
