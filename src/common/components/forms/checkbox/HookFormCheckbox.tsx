/**
 * @file HookFormCheckbox.tsx
 * @description
 * A reusable, type-safe checkbox component integrated with React Hook Form.
 * Supports optional label, description, and consistent form styling.
 *
 * Works with generic form types (`TValues extends FieldValues`) from `react-hook-form`.
 *
 * @example
 * <HookFormCheckbox
 *    name="agreeTerms"
 *    label="I agree to the terms and conditions"
 *    control={control}
 * />
 */

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/common/components/ui/form.tsx";
import {Checkbox} from "@/common/components/ui/checkbox.tsx";
import {cn} from "@/common/lib/utils.ts";
import {FieldValues} from "react-hook-form";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for the {@link HookFormCheckbox} component.
 *
 * @template TValues - The type of the form values from `react-hook-form`.
 */
const HookFormCheckbox = <TValues extends FieldValues>(
    props: HookFormInputControlProps<TValues>
): JSX.Element => {
    const {name, label, description, control, className} = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem
                    className={cn(
                        "flex flex-row items-start",
                        "rounded-md border dark:border-neutral-500 shadow",
                        "space-x-3 space-y-0 p-4",
                        className
                    )}
                >
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>

                    <div className="space-y-1 leading-none">
                        <FormLabel className={PrimaryTextBaseCSS}>{label}</FormLabel>
                        {description && <FormDescription>{description}</FormDescription>}
                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />
    );
};

export default HookFormCheckbox;
