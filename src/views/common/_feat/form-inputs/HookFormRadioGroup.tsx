/**
 * @fileoverview A radio group form input integrated with react-hook-form and shadcn UI components.
 */

import {ReactElement} from "react";
import {ControllerProps, FieldValues, useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat";
import {HookFormInputProps} from "@/common/_types/input/HookFormInputProps.ts";
import {HookRadioOption} from "@/common/_types/input/HookRadioOption.ts";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    RadioGroup,
    RadioGroupItem
} from "@/common/components/ui";

/** Props for the HookFormRadioGroup component. */
type GroupProps<TValues extends FieldValues> = Omit<HookFormInputProps<TValues>, "control"> & {
    items: HookRadioOption[];
};

/**
 * Form field component rendering a radio button group managed by react-hook-form.
 */
export function HookFormRadioGroup<TValues extends FieldValues>(
    {label, name, items, classNames}: GroupProps<TValues>
): ReactElement {
    const {control} = useFormContext<TValues>();

    const renderField: ControllerProps<TValues>["render"] = ({field}) => (
        <FormItem className="space-y-3">
            {label && <FormLabel className={cn("primary-text", classNames?.label)}>{label}</FormLabel>}
            <FormControl>
                <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    className={classNames?.container}
                >
                    {items.map((item) => (
                        <FormItem
                            key={`radio-option-${label}-${item.label}`}
                            className="flex items-center space-x-3 space-y-0"
                        >
                            <FormControl>
                                <RadioGroupItem className={classNames?.input} value={item.value}/>
                            </FormControl>
                            <FormLabel className={cn("font-normal", classNames?.text)}>
                                {item.label}
                            </FormLabel>
                        </FormItem>
                    ))}
                </RadioGroup>
            </FormControl>
            <FormMessage/>
        </FormItem>
    );

    return (
        <FormField control={control} name={name} render={renderField}/>
    );
}
