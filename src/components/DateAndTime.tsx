import { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Calendar } from "./ui/calendar";

const DateAndTime = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return (
    <HoverCard openDelay={10} closeDelay={10}>
      <HoverCardTrigger className="bg-background/40 px-4 py-1 rounded-md">
        {formattedTime}
      </HoverCardTrigger>
      <HoverCardContent align="end" className="w-fit">
        <Calendar
          mode="single"
          className="rounded-lg border-none bg-transparent"
        />
      </HoverCardContent>
    </HoverCard>
  );
};
export default DateAndTime;
