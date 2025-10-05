import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { getTemperatureLevel } from "@/constants/constants";

interface DateRangeCalendarProps {
  selectModeOnly?: boolean;
  temperatureData?: Record<string, number>;
  onDateChange?: (range: DateRange | undefined) => void;
}

const DateRangeCalendar = ({
  selectModeOnly = false,
  temperatureData,
  onDateChange,
}: DateRangeCalendarProps) => {
  const [date, setDate] = useState<DateRange | undefined>();
  const [modifiers, setModifiers] = useState<Record<string, Date[]>>({
    green: [],
    yellow: [],
    orange: [],
    red: [],
  });

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);
    onDateChange?.(range);
  };

  useEffect(() => {
    if (!temperatureData) return;

    const newMods: Record<string, Date[]> = {
      green: [],
      yellow: [],
      orange: [],
      red: [],
    };
    Object.entries(temperatureData).forEach(([key, temp]) => {
      const d = new Date(key);
      const level = getTemperatureLevel(temp);
      newMods[level].push(d);
    });
    setModifiers(newMods);
  }, [temperatureData]);

  return (
    <div className="p-6 bg-black text-white">
      <Calendar
        mode="range"
        selected={date}
        onSelect={handleSelect}
        numberOfMonths={1}
        modifiers={!selectModeOnly ? modifiers : undefined}
        modifiersClassNames={{
          green: "bg-green-500 text-white rounded-md",
          yellow: "bg-yellow-400 text-black rounded-md",
          orange: "bg-orange-500 text-white rounded-md",
          red: "bg-red-600 text-white rounded-md",
        }}
        className="rounded-lg shadow-md"
      />

      {/* Range summary */}
      {!temperatureData && (
        <div className="mt-6 text-white space-y-1">
          {date?.from && date?.to ? (
            <>
              <p>
                <strong>From:</strong> {format(date.from, "PPP")}
              </p>
              <p>
                <strong>To:</strong> {format(date.to, "PPP")}
              </p>
            </>
          ) : date?.from ? (
            <p>
              <strong>Selected:</strong> {format(date.from, "PPP")}
            </p>
          ) : (
            <p className="text-white/70">No date selected yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DateRangeCalendar;
