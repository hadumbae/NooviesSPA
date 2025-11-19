/**
 * @file HookFormFileInput.tsx
 * @description
 * A reusable, type-safe file input component integrated with React Hook Form.
 * Supports single and multiple file selection, optional labels, descriptions,
 * disabled state, and automatic form value binding.
 *
 * Works with generic form types (`TValues extends FieldValues`) from `react-hook-form`.
 *
 * @example
 * <HookFormFileInput
 *    name="profilePicture"
 *    label="Upload Profile Picture"
 *    control={control}
 *    multiple={false}
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
import {Input} from "@/common/components/ui/input.tsx";
import {FieldValues} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import {HookFormFileInputProps, HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for the {@link HookFormFileInput} component.
 *
 * @template TValues - The type of the form values from `react-hook-form`.
 */
type FileInputProps<TValues extends FieldValues> = HookFormInputControlProps<TValues> & Omit<HookFormFileInputProps, "type">;

/**
 * `HookFormFileInput` is a type-safe file input component integrated with React Hook Form.
 *
 * Features:
 * - Supports single or multiple file selection
 * - Automatically updates the form field value
 * - Optional label and description
 * - Disabled state support
 *
 * @template TValues - The type of the form values.
 *
 * @param {FileInputProps<TValues>} props - Configuration for the file input.
 * @returns {JSX.Element} A file input field bound to React Hook Form.
 *
 * @example
 * <HookFormFileInput
 *    name="documents"
 *    label="Upload Documents"
 *    control={control}
 *    multiple={true}
 * />
 */
const HookFormFileInput = <TValues extends FieldValues>(props: FileInputProps<TValues>) => {
    const {
        name,
        label,
        description,
        control,
        disabled,
        className,
        multiple = false,
        hasLabel = true,
    } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({field: {value, onChange, ...fieldProps}}) => (
                <FormItem className={cn(className)}>
                    {
                        hasLabel &&
                        <FormLabel className={PrimaryTextBaseCSS}>{label}</FormLabel>
                    }

                    <FormControl>
                        <Input
                            className="dark:text-neutral-500"
                            type="file"
                            disabled={disabled}
                            multiple={multiple}
                            onChange={(event) =>
                                onChange(
                                    event.target.files &&
                                    (multiple ? event.target.files : event.target.files[0])
                                )
                            }
                            {...fieldProps}
                        />
                    </FormControl>

                    {description && <FormDescription>{description}</FormDescription>}

                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default HookFormFileInput;
