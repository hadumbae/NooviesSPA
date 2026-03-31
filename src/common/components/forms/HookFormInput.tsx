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
        inputClassName,
        labelClassName,
        ...inputProps
    } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem className={cn(className, "dark:text-white")}>
                    {
                        label &&
                        <FormLabel className={labelClassName}>{label}</FormLabel>
                    }

                    <FormControl>
                        <Input
                            placeholder={placeholder || label}
                            className={cn(HookFormInputCSS, inputClassName)}
                            {...inputProps}
                            {...field}
                        />
                    </FormControl>

                    {description && <FormDescription>{description}</FormDescription>}

                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default HookFormInput;