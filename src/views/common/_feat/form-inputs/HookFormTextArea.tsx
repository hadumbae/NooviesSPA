/**
 * @fileoverview A reusable textarea component integrated with react-hook-form.
 */

import {ReactElement} from "react";
import {ControllerProps, FieldValues, useFormContext} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";
import {HookFormInputCSS} from "@/common/constants/css/HookFormInputCSS.ts";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Textarea
} from "@/common/components/ui";

/**
 * A form textarea component that uses react-hook-form's Controller for state management.
 */
export function HookFormTextArea<TValues extends FieldValues>(
    {name, label, description, placeholder, classNames}: Omit<HookFormInputControlProps<TValues>, "control">
): ReactElement {
    const {control} = useFormContext<TValues>();

    const renderField: ControllerProps<TValues>["render"] = ({field}) => (
        <FormItem className={classNames?.container}>
            {label && <FormLabel className={cn("primary-text", classNames?.label)}>{label}</FormLabel>}

            <FormControl>
                <Textarea
                    placeholder={placeholder || label}
                    className={cn(HookFormInputCSS, "resize-none h-28", classNames?.input)}
                    {...field}
                />
            </FormControl>

            {description && <FormDescription>{description}</FormDescription>}

            <FormMessage/>
        </FormItem>
    );

    return (
        <FormField control={control} name={name} render={renderField}/>
    );
}
