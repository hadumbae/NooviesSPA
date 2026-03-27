/**
 * @file Reusable, typed input component integrated with react-hook-form and shadcn/ui.
 * @filename HookFormInput.tsx
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
 * A generic form input wrapper that synchronizes Shadcn UI primitives with RHF control.
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
                    {/** Renders label if provided and not explicitly disabled. */}
                    {label && hasLabel && <FormLabel>{label}</FormLabel>}

                    <FormControl>
                        <Input
                            placeholder={placeholder || label}
                            className={HookFormInputCSS}
                            {...inputProps}
                            {...field}
                        />
                    </FormControl>

                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}

                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default HookFormInput;