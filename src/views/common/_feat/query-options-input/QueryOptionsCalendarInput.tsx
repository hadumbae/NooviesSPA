/**
 * @fileoverview Popover calendar input component for selecting and updating date query options.
 */

import {ReactElement, useEffect, useState} from "react";
import {cn} from "@/common/_feat";
import {Button, Calendar, CalendarProps, Popover, PopoverContent, PopoverTrigger} from "@/views/common/_comp/ui";
import {ButtonVariant} from "@/common/_types";
import {DateOnlyString} from "@/common/_schemas";
import {DateTime} from "luxon";
import {CalendarIcon} from "lucide-react";

type InputProps = Omit<CalendarProps, "className" | "classNames"> & {
    presetValue?: Date;
    variant?: ButtonVariant;
    className?: string;
    setQueryValue: (value?: DateOnlyString) => void;
};

/** Calendar picker popover for selecting date query parameters. */
export function QueryOptionsCalendarInput(
    {setQueryValue, presetValue, variant = "outline", className, captionLayout = "dropdown", ...calProps}: InputProps
): ReactElement {
    const [date, setDate] = useState<Date | undefined>(presetValue);

    useEffect(() => {
        setDate(presetValue);
    }, [presetValue])

    const handleDateChange = (date: Date | undefined) => {
        const dateString: DateOnlyString | undefined = date
            ? DateTime.fromJSDate(date).toISODate() ?? undefined
            : undefined;

        setDate(date);
        setQueryValue(dateString);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={variant} className={cn("font-normal text-muted-foreground", className)}>
                    {date ? DateTime.fromJSDate(date).toISODate() : <span>Pick A Date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    {...calProps}
                    mode="single"
                    captionLayout={captionLayout}
                    selected={date}
                    onSelect={handleDateChange}
                />
            </PopoverContent>
        </Popover>
    );
}