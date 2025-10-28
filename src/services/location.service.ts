import axios from "axios";
import type { LocationResponse } from "../interfaces/location";

class LocationService {
  static async getUserCity(): Promise<string> {
    const { data } = await axios.get<LocationResponse>(
      "https://ipapi.co/json/"
    );
    return data.city || "Salvador";
  }
}
export default LocationService;
