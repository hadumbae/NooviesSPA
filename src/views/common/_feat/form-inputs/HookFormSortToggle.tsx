/**
 * @fileoverview Sort toggle component integrated with React Hook Form.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";
import {HookFormInputControlProps} from "@/common/_types/input/HookFormInputProps.ts";
import {ControllerProps, FieldValues, useFormContext} from "react-hook-form";
import {ArrowDownUp, ArrowDownWideNarrow, ArrowUpNarrowWide} from "lucide-react";
import {Button, FormControl, FormField, FormItem, FormLabel,} from "@/views/common/_comp/ui";

/**
 * Renders a button that toggles between sorting states.
 */
export function HookFormSortToggle<TValues extends FieldValues>(
    {name, label, className, disabled}: Omit<HookFormInputControlProps<TValues>, "control">
): ReactElement {
    const {control} = useFormContext<TValues>();

    const options = [
        {label: "None", value: "", color: "text-muted-foreground", icon: ArrowDownUp},
        {label: "Asc", value: "1", color: "text-success dark:text-success", icon: ArrowUpNarrowWide},
        {label: "Desc", value: "-1", color: "text-destructive dark:text-destructive", icon: ArrowDownWideNarrow},
    ];

    const renderField: ControllerProps<TValues>["render"] = ({field}) => {
        const currentIndex = options.findIndex(opt => opt.value === field.value);
        const nextIndex = (currentIndex + 1) % options.length;
        const current = options[currentIndex] ?? options[0];

        return (
            <FormItem className={cn("flex items-center space-y-0", className)}>
                {label && <FormLabel className="text-sm font-bold">{label}</FormLabel>}

                <FormControl>
                    <Button
                        variant="ghost"
                        type="button"
                        size="sm"
                        disabled={disabled}
                        className={cn("gap-2 font-bold", current.color)}
                        onClick={() => field.onChange(options[nextIndex].value)}
                    >
                        <current.icon size={16}/>
                        <span>{current.label}</span>
                    </Button>
                </FormControl>
            </FormItem>
        );
    }

    return (
        <FormField control={control} name={name} render={renderField}/>
    );
}

