/**
 * @fileoverview A reusable, type-safe file input component integrated with React Hook Form.
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
import {HookFormInputCSS} from "@/common/constants/css/HookFormInputCSS.ts";
import {ReactElement, useEffect, useRef} from "react";

/** Props for the HookFormFileInput component. */
type FileInputProps<TValues extends FieldValues> =
    HookFormInputControlProps<TValues>
    & Omit<HookFormFileInputProps, "type">;

/**
 * A file input field bound to React Hook Form that supports single or multiple file selection.
 */
export function HookFormFileInput<TValues extends FieldValues>(
    {name, label, description, control, disabled, className, multiple = false, hasLabel = true}: FileInputProps<TValues>
): ReactElement {
    return (
        <FormField
            control={control}
            name={name}
            render={({field: {value, onChange, ...fieldProps}}) => {
                const inputRef = useRef<HTMLInputElement>(null);

                useEffect(() => {
                    if (!value && inputRef.current) {
                        inputRef.current.value = "";
                    }
                }, [value]);

                return (
                    <FormItem className={cn(className)}>
                        {
                            hasLabel &&
                            <FormLabel className={PrimaryTextBaseCSS}>{label}</FormLabel>
                        }

                        <FormControl>
                            <Input
                                className={HookFormInputCSS}
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
                );
            }}
        />
    );
}
