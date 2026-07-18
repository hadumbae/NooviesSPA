/**
 * @fileoverview A checkbox input component integrated with react-hook-form.
 */

import {cn} from "@/common/_feat";
import {ControllerProps, FieldValues, useFormContext} from "react-hook-form";
import {HookFormInputControlProps} from "@/common/_types/input/HookFormInputProps.ts";
import {ReactElement} from "react";
import {
    Checkbox,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/common/components/ui";

/**
 * A checkbox form field component that requires a react-hook-form provider.
 */
export function HookFormCheckbox<TValues extends FieldValues>(
    {name, label, description, classNames}: Omit<HookFormInputControlProps<TValues>, "control">
): ReactElement {
    const {control} = useFormContext<TValues>();

    const renderField: ControllerProps<TValues>["render"] = ({field}) => (
        <FormItem
            className={cn(
                "flex flex-row items-start",
                "rounded-md border dark:border-neutral-500 shadow",
                "space-x-3 space-y-0 p-4",
                classNames?.container
            )}
        >
            <FormControl>
                <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={classNames?.input}
                />
            </FormControl>

            <div className="space-y-1 leading-none">
                <FormLabel className={cn("primary-text", classNames?.label)}>{label}</FormLabel>
                {description && <FormDescription>{description}</FormDescription>}
                <FormMessage/>
            </div>
        </FormItem>
    );

    return (
        <FormField control={control} name={name} render={renderField}/>
    );
}
