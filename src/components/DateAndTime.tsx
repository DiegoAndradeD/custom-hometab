// Hooks
import { useEffect, useState } from "react";
// Components
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
