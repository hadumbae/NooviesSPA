import React from 'react';
import {Control} from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/common/components/ui/form.tsx";
import {Popover, PopoverTrigger} from "@radix-ui/react-popover";
import {Button} from "@/common/components/ui/button.tsx";
import {CalendarIcon} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {format} from "date-fns";
import {PopoverContent} from "@/common/components/ui/popover.tsx";
import {Calendar} from "@/common/components/ui/calendar.tsx";

interface Props {
    name: string,
    label: string;
    control: Control<any>;
    placeholder?: string;
    description?: string;
    mode?: "ALL" | "PAST" | "FUTURE";
}

const HookFormDatePicker: React.FC<Props> = ({name, label, control, description, placeholder, mode = "ALL"}) => {
    const today = new Date();
    today.setHours(0,0,0,0);

    const isInvalidDate = (date: Date) =>
        (date < new Date("1900-01-01")) ||
        (mode === "PAST" && date > today) ||
        (mode === "FUTURE" && today > date)
    ;

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => <FormItem className="flex flex-col">
                <FormLabel>{label}</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                )}
                            >
                                {
                                    field.value
                                        ? (format(field.value, "PPP"))
                                        : (<span>{placeholder || "Pick a date"}</span>)
                                }
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={isInvalidDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                {
                    description &&
                    <FormDescription>
                        {description}
                    </FormDescription>
                }

                <FormMessage />
            </FormItem>} />
    );
};

export default HookFormDatePicker;
