// Hooks
import { useEffect, useState } from "react";
// Components
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Calendar } from "./ui/calendar";
// Data
import { DATE_TIME_FORMAT_OPTIONS } from "../data/date-time-format-options.data";
// Stores
import useWidgetsStore from "../stores/widgets.store";

const DateAndTime = () => {
  const { dateAndTimeWidget } = useWidgetsStore();
  const [time, setTime] = useState<Date>(new Date());

  const formatter = new Intl.DateTimeFormat(
    "en-US",
    DATE_TIME_FORMAT_OPTIONS[dateAndTimeWidget.variant]
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formattedTime = formatter.format(time);

  return (
    <HoverCard openDelay={10} closeDelay={10}>
      <HoverCardTrigger
        className="bg-background px-4 py-1 rounded-2xl text-sm !h-7 !min-h-7 !max-h-7 flex items-center
      justify-center text-foreground"
      >
        {formattedTime}
      </HoverCardTrigger>
      <HoverCardContent align="center" className="w-fit">
        <Calendar
          mode="single"
          className="rounded-lg border-none bg-transparent"
        />
      </HoverCardContent>
    </HoverCard>
  );
};
export default DateAndTime;
