/**
 * @file HookFormSortToggle.tsx
 * @description
 * A reusable sort toggle component integrated with React Hook Form.
 * Allows cycling through sorting states: "None", "Asc" (ascending), and "Desc" (descending).
 * Displays a button with a corresponding icon and color based on the current state.
 *
 * Works with generic form types (`TValues extends FieldValues`) from `react-hook-form`.
 *
 * @example
 * <HookFormSortToggle
 *    name="priceSort"
 *    label="Sort by Price"
 *    control={control}
 * />
 */

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/common/components/ui/form.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {ArrowDownUp, ArrowDownWideNarrow, ArrowUpNarrowWide} from "lucide-react";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";
import {FieldValues} from "react-hook-form";

/**
 * Props for the {@link HookFormSortToggle} component.
 *
 * @template TValues - The type of the form values from `react-hook-form`.
 */
const HookFormSortToggle = <TValues extends FieldValues>(
    props: HookFormInputControlProps<TValues>
): JSX.Element => {
    const {
        name,
        label,
        control,
        className,
        disabled,
    } = props;

    const options = [
        {label: "None", value: "", colour: "text-neutral-400 dark:text-white", icon: ArrowDownUp},
        {label: "Asc", value: "asc", colour: "text-green-400 dark:text-green-400", icon: ArrowUpNarrowWide},
        {label: "Desc", value: "desc", colour: "text-red-400 dark:text-red-400", icon: ArrowDownWideNarrow},
    ];

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => {
                const currentIndex = options.findIndex(opt => opt.value === field.value);
                const nextIndex = (currentIndex + 1) % options.length;
                const current = options[currentIndex] ?? options[0];

                return (
                    <FormItem className={cn("flex items-center space-y-0", className)}>
                        {label && <FormLabel className="dark:text-white">{label}</FormLabel>}

                        <FormControl>
                            <Button
                                variant="link"
                                type="button"
                                disabled={disabled}
                                className={current.colour}
                                onClick={() => field.onChange(options[nextIndex].value)}
                            >
                                <current.icon/>
                                {current.label}
                            </Button>
                        </FormControl>
                    </FormItem>
                );
            }}
        />
    );
};

export default HookFormSortToggle;
