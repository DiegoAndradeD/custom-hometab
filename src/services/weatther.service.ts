import axios from "axios";
import type { WeatherResponse } from "../interfaces/weather";

class WeatherService {
  static async getWeather(city: string): Promise<WeatherResponse> {
    const { data } = await axios.get<WeatherResponse>(
      `https://wttr.in/${city}?format=j1`
    );
    return data;
  }
}
export default WeatherService;
