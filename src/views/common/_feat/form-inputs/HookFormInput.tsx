/**
 * @fileoverview Generic form input component integrated with react-hook-form and shadcn/ui.
 */

import {ReactElement} from "react";
import {ControllerProps, FieldValues} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import {HookFormInputCSS} from "@/common/constants/css/HookFormInputCSS.ts";
import {HookFormInputProps} from "@/common/type/input/HookFormInputProps.ts";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input} from "@/common/components/ui";

/**
 * Generic form input component integrated with react-hook-form and shadcn/ui.
 */
export function HookFormInput<TValues extends FieldValues>(
    {name, control, label, description, placeholder, classNames, ...inputProps}: HookFormInputProps<TValues>
): ReactElement {
    const renderField: ControllerProps<TValues>["render"] = ({field}) => (
        <FormItem className={cn(classNames?.container, "dark:text-white")}>
            {label && <FormLabel className={classNames?.label}>{label}</FormLabel>}

            <FormControl>
                <Input
                    placeholder={placeholder || label}
                    className={cn(HookFormInputCSS, classNames?.input)}
                    {...inputProps}
                    {...field}
                />
            </FormControl>

            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage/>
        </FormItem>
    );

    return <FormField control={control} name={name} render={renderField}/>;
}