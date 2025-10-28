// Hooks
import { useQuery } from "@tanstack/react-query";
import { useMemo, type JSX } from "react";
// Components
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./ui/item";
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiDaySunnyOvercast,
  WiHumidity,
} from "react-icons/wi";
import { Separator } from "./ui/separator";
import { Spinner } from "./ui/spinner";
// Interfaces
import type { WeatherResponse } from "../interfaces/weather";
// Services
import { LocationService, WeatherService } from "../services";

interface WeatherIcon {
  icon: JSX.Element;
  label: string;
}

const ICON_SIZE = 40;

const WEATHER_PATTERNS: Array<{
  condition: (text: string) => boolean;
  icon: JSX.Element;
  label: string;
}> = [
  {
    condition: (text) => text.includes("sunny") && text.includes("dry"),
    icon: <WiDaySunny size={ICON_SIZE} />,
    label: "Sunny and dry",
  },
  {
    condition: (text) => text.includes("sunny") && text.includes("wet"),
    icon: <WiDaySunnyOvercast size={ICON_SIZE} />,
    label: "Sunny and wet",
  },
  {
    condition: (text) => text.includes("sunny"),
    icon: <WiDaySunny size={ICON_SIZE} />,
    label: "Sunny",
  },
  {
    condition: (text) => text.includes("rain"),
    icon: <WiRain size={ICON_SIZE} />,
    label: "Rain",
  },
  {
    condition: (text) => text.includes("cloud"),
    icon: <WiCloudy size={ICON_SIZE} />,
    label: "Cloudy",
  },
];

const mapWeatherToIcon = (desc: string): WeatherIcon => {
  const text = desc.toLowerCase();

  const match = WEATHER_PATTERNS.find((pattern) => pattern.condition(text));

  if (match) {
    return { icon: match.icon, label: match.label };
  }

  return {
    icon: <WiHumidity size={ICON_SIZE} />,
    label: desc,
  };
};

const Weather = () => {
  const {
    data: city,
    isLoading: cityLoading,
    error: cityError,
  } = useQuery({
    queryKey: ["city"],
    queryFn: LocationService.getUserCity,
    staleTime: 1000 * 60 * 60,
    retry: 2,
  });

  const {
    data: weatherData,
    isLoading: weatherLoading,
    error: weatherError,
  } = useQuery<WeatherResponse>({
    queryKey: ["weather", city],
    queryFn: () => WeatherService.getWeather(city!),
    enabled: !!city,
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchInterval: 1000 * 60 * 10,
  });

  const weatherInfo = useMemo(() => {
    if (!weatherData?.current_condition?.[0]) return null;

    const condition = weatherData.current_condition[0];
    const weatherDesc = condition.weatherDesc[0]?.value || "Unknown";
    const { icon, label } = mapWeatherToIcon(weatherDesc);

    return {
      temp: condition.temp_C,
      feelsLike: condition.FeelsLikeC,
      humidity: condition.humidity,
      icon,
      label,
    };
  }, [weatherData]);

  const isLoading = cityLoading || weatherLoading;
  const hasError = cityError || weatherError;

  if (isLoading) {
    return (
      <div className="bg-background px-4 py-1 rounded-2xl text-sm h-7 flex gap-1 items-center justify-center text-muted-foreground animate-pulse">
        <span>Fetching weather data</span>
        <Spinner />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="bg-background px-4 py-1 rounded-2xl text-sm h-7 flex items-center justify-center text-destructive">
        Error fetching data
      </div>
    );
  }

  if (!weatherInfo || !city) {
    return (
      <div className="bg-background px-4 py-1 rounded-2xl text-sm h-7 flex items-center justify-center text-muted-foreground">
        Data unavailable
      </div>
    );
  }

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          className="bg-background px-4 py-1 rounded-2xl text-sm h-7 flex items-center justify-center text-foreground cursor-pointer"
          aria-label={`Clima em ${city}: ${weatherInfo.temp} graus Celsius, ${weatherInfo.label}`}
        >
          {city}: {weatherInfo.temp}°C
        </button>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-72 py-1 px-4">
        <Item variant="default" className="p-0">
          <ItemContent>
            <ItemTitle>Today</ItemTitle>
            <ItemDescription>{weatherInfo.label}</ItemDescription>
          </ItemContent>
          <ItemActions>{weatherInfo.icon}</ItemActions>
        </Item>
        <div className="text-xs text-muted-foreground mt-1 space-y-0.5 flex items-center gap-2">
          <p>Sensation: {weatherInfo.feelsLike}°C</p>
          <Separator orientation="vertical" className="!h-4" />
          <p>Humidity: {weatherInfo.humidity}%</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Weather;
