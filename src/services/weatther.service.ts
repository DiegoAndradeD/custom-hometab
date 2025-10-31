import axios from "axios";
import type { IWeatherResponse } from "../interfaces/weather";

class WeatherService {
  static async getWeather(city: string): Promise<IWeatherResponse> {
    const { data } = await axios.get<IWeatherResponse>(
      `https://wttr.in/${city}?format=j1`
    );
    return data;
  }
}
export default WeatherService;
