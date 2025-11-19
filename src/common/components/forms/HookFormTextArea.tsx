/**
 * @file HookFormTextArea.tsx
 * @description
 * A reusable, type-safe textarea component integrated with React Hook Form.
 * Supports optional descriptions, placeholder text, and additional styling.
 *
 * Works with generic form types (`TValues extends FieldValues`) from `react-hook-form`.
 *
 * @example
 * <HookFormTextArea
 *    name="bio"
 *    label="Biography"
 *    placeholder="Tell us about yourself..."
 *    control={control}
 * />
 */

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/common/components/ui/form.tsx";
import {FieldValues} from "react-hook-form";
import {Textarea} from "@/common/components/ui/textarea.tsx";
import {cn} from "@/common/lib/utils.ts";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";
import {HookFormInputCSS} from "@/common/constants/css/HookFormInputCSS.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * `HookFormTextArea` props are based on {@link HookFormInputControlProps} from `react-hook-form`.
 *
 * @template TValues - The type of your form values.
 */
const HookFormTextArea = <TValues extends FieldValues>(props: HookFormInputControlProps<TValues>) => {
    const {name, label, description, placeholder, control, className} = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormLabel className={PrimaryTextBaseCSS}>{label}</FormLabel>

                    <FormControl>
                        <Textarea
                            placeholder={placeholder || label}
                            className={cn(HookFormInputCSS, "resize-none h-28", className)}
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

export default HookFormTextArea;
