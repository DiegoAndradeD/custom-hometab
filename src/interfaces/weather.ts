export interface WeatherDescription {
  value: string;
}

export interface CurrentCondition {
  temp_C: string;
  FeelsLikeC: string;
  weatherDesc: WeatherDescription[];
  humidity: string;
}

export interface WeatherResponse {
  current_condition: CurrentCondition[];
}
