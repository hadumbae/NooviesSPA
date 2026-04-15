/**
 * @fileoverview Reusable sort toggle component integrated with React Hook Form.
 * Cycles through three states: "None" (unsorted), "Asc" (ascending), and "Desc" (descending).
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {ArrowDownUp, ArrowDownWideNarrow, ArrowUpNarrowWide} from "lucide-react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/common/components/ui/form.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";

/**
 * Renders a button that toggles between sorting states.
 */
export function HookFormSortToggle<TValues extends FieldValues>(
    {name, label, control, className, disabled}: HookFormInputControlProps<TValues>
): ReactElement {
    const options = [
        {label: "None", value: "", color: "text-muted-foreground", icon: ArrowDownUp},
        {label: "Asc", value: "1", color: "text-success dark:text-success", icon: ArrowUpNarrowWide},
        {label: "Desc", value: "-1", color: "text-destructive dark:text-destructive", icon: ArrowDownWideNarrow},
    ];

    return (
        <FormField control={control} name={name} render={({field}) => {
            const currentIndex = options.findIndex(opt => opt.value === field.value);
            const nextIndex = (currentIndex + 1) % options.length;
            const current = options[currentIndex] ?? options[0];

            return (
                <FormItem className={cn("flex items-center justify-between space-y-0", className)}>
                    {label && <FormLabel className="text-sm font-medium">{label}</FormLabel>}

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
        }}
        />
    );
}

export default HookFormSortToggle;