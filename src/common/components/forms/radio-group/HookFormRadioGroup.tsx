/**
 * @file HookFormRadioGroup.tsx
 * @description
 * A reusable, type-safe radio group component integrated with React Hook Form.
 * Supports multiple radio options, optional labels, and consistent form styling.
 *
 * Works with generic form types (`TValues extends FieldValues`) from `react-hook-form`.
 *
 * @example
 * <HookFormRadioGroup
 *    name="gender"
 *    label="Gender"
 *    control={control}
 *    items={[
 *      { label: "Male", value: "male" },
 *      { label: "Female", value: "female" },
 *      { label: "Other", value: "other" },
 *    ]}
 * />
 */

import {RadioGroup, RadioGroupItem} from "@/common/components/ui/radio-group.tsx";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/common/components/ui/form.tsx";
import {FieldValues} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import {HookFormInputProps} from "@/common/type/input/HookFormInputProps.ts";
import HookRadioOption from "@/common/type/input/HookRadioOption.ts";

/**
 * Props for the {@link HookFormRadioGroup} component.
 *
 * @template TValues - The type of the form values from `react-hook-form`.
 */
type GroupProps<TValues extends FieldValues> = HookFormInputProps<TValues> & {
    /** Array of radio options to display */
    items: HookRadioOption[];
};

/**
 * `HookFormRadioGroup` is a type-safe radio group component integrated with React Hook Form.
 *
 * Features:
 * - Supports multiple radio options
 * - Works with generic form types (`TValues extends FieldValues`)
 * - Integrates with `FormField` for consistent form styling
 *
 * @template TValues - The type of the form values.
 *
 * @param {GroupProps<TValues>} props - Props to configure the radio group.
 * @returns {JSX.Element} A form-connected radio group input.
 *
 * @example
 * <HookFormRadioGroup
 *    name="subscription"
 *    label="Subscription Plan"
 *    control={control}
 *    items={[
 *      { label: "Basic", value: "basic" },
 *      { label: "Premium", value: "premium" },
 *    ]}
 * />
 */
const HookFormRadioGroup = <TValues extends FieldValues>(
    props: GroupProps<TValues>
): JSX.Element => {
    const {control, label, name, items, className} = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem className="space-y-3">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                            className={cn(className)}
                        >
                            {items.map((item) => (
                                <FormItem
                                    key={`radio-option-${label}-${item.label}`}
                                    className="flex items-center space-x-3 space-y-0"
                                >
                                    <FormControl>
                                        <RadioGroupItem value={item.value}/>
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        {item.label}
                                    </FormLabel>
                                </FormItem>
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default HookFormRadioGroup;
