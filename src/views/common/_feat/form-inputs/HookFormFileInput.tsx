/**
 * @fileoverview A reusable, type-safe file input component integrated with React Hook Form.
 */
import {ReactElement, useEffect, useRef} from "react";
import {ControllerProps, FieldValues, useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input} from "@/common/components/ui";
import {HookFormFileInputProps, HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";

/** Props for the HookFormFileInput component. */
type FileInputProps<TValues extends FieldValues> =
    Omit<HookFormInputControlProps<TValues>, "control"> &
    Omit<HookFormFileInputProps, "type">;

/**
 * A file input field bound to React Hook Form that supports single or multiple file selection.
 */
export function HookFormFileInput<TValues extends FieldValues>(
    {name, label, description, disabled, classNames, multiple = false, hasLabel = true}: FileInputProps<TValues>
): ReactElement {
    const {control} = useFormContext<TValues>();

    const renderField: ControllerProps<TValues>["render"] = ({field: {value, onChange, ...fieldProps}}) => {
        const inputRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            if (!value && inputRef.current) {
                inputRef.current.value = "";
            }
        }, [value]);

        return (
            <FormItem className={classNames?.container}>
                {hasLabel && <FormLabel className={cn("primary-text", classNames?.label)}>{label}</FormLabel>}

                <FormControl>
                    <Input
                        className={cn("default-form-input", classNames?.input)}
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
    };

    return (
        <FormField control={control} name={name} render={renderField}/>
    );
}
