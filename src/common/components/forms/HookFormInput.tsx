/**
 * @file HookFormInput
 * @description
 * A reusable, typed input component wired to `react-hook-form`.
 * It wraps shadcn/ui form primitives (`FormField`, `FormItem`, `FormLabel`, etc.)
 * and applies consistent styling with `HookFormInputCSS`.
 *
 * Designed for flexible usage across forms, supporting:
 * - number/text inputs
 * - min/max/step constraints
 * - optional description text
 * - optional label toggling
 */

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/common/components/ui/form.tsx";
import {Input} from "@/common/components/ui/input.tsx";
import {cn} from "@/common/lib/utils.ts";
import {HookFormInputCSS} from "@/common/constants/css/HookFormInputCSS.ts";
import {FieldValues} from "react-hook-form";
import {HookFormInputProps} from "@/common/type/input/HookFormInputProps.ts";

/**
 * A typed, reusable form input component integrated with `react-hook-form`.
 *
 * @param params - {@link InputProps} controlling label, validation binding, input attributes, and styling.
 * @returns A fully configured React input field wrapped in shadcn/ui form components.
 *
 * @example
 * ```tsx
 * <HookFormInput
 *   name="age"
 *   label="Age"
 *   type="number"
 *   min={0}
 *   control={form.control}
 * />
 * ```
 */
const HookFormInput = <TValues extends FieldValues>(props: HookFormInputProps<TValues>) => {
    const {
        name,
        label,
        description,
        placeholder,
        control,
        className,
        hasLabel = true,
        ...inputProps
    } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem className={cn(className, "dark:text-white")}>
                    {hasLabel && <FormLabel>{label}</FormLabel>}

                    <FormControl>
                        <Input
                            placeholder={placeholder || label}
                            className={HookFormInputCSS}
                            {...inputProps}
                            {...field}
                        />
                    </FormControl>

                    {
                        description &&
                        <FormDescription>{description}</FormDescription>
                    }

                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default HookFormInput;
