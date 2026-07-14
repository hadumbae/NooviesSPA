/**
 * @fileoverview A reusable, type-safe multi-select component integrated with React Hook Form.
 */

import Select from "react-select";
import {Controller, FieldValues, useFormContext} from "react-hook-form";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {FormControl, FormDescription, FormItem, FormLabel,} from "@/common/components/ui/form.tsx";
import {HookFormErrorMessage} from "@/views/common/_feat/form-inputs/HookFormErrorMessage.tsx";
import {cn} from "@/common/lib/utils.ts";
import {ReactSelectMultiStyleConfig} from "@/common/_const/css/ReactSelectCSS.ts";
import {FormMultiSelectOnChangeHandler, FormSelectValueHandler} from "@/common/types";
import {ReactElement} from "react";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";

/** Props for the HookFormMultiSelect component. */
type MultiSelectProps<TSubmit extends FieldValues, TValue = any> =
    Omit<HookFormInputControlProps<TSubmit>, "control"> & {
    options: ReactSelectOption[];
    handleOnChange?: FormMultiSelectOnChangeHandler<TSubmit, TValue>;
    handleValue?: FormSelectValueHandler<TSubmit, TValue, ReactSelectOption<TValue>[]>;
};

/**
 * A multi-select form field component using react-select and React Hook Form.
 */
export function HookFormMultiSelect<TSubmit extends FieldValues>(
    props: MultiSelectProps<TSubmit>
): ReactElement {
    const {
        name,
        label,
        description,
        placeholder,
        disabled,
        className,
        options = [],
        hasLabel = true,
        handleOnChange,
        handleValue,
    } = props;

    const {control} = useFormContext<TSubmit>();

    return (
        <Controller
            control={control}
            name={name}
            render={({field, fieldState: {error}}) => {
                const id = `select-multi-${name}`;

                return (
                    <FormItem className={cn(className)}>
                        {
                            hasLabel && (
                                <FormLabel htmlFor={id} className="primary-text">
                                    {label}
                                </FormLabel>
                            )
                        }

                        <FormControl>
                            <Select
                                options={options}
                                isMulti={true}
                                value={
                                    handleValue
                                        ? handleValue(options, field)
                                        : options.filter(v => field.value?.includes(v.value))
                                }
                                onChange={val => {
                                    const values = val.map(v => v.value);

                                    if (handleOnChange) {
                                        handleOnChange(values, field)
                                    } else {
                                        field.onChange()
                                    }
                                }}
                                placeholder={placeholder}
                                isDisabled={disabled}
                                classNames={ReactSelectMultiStyleConfig}
                                unstyled={true}
                            />
                        </FormControl>

                        {description && (
                            <FormDescription>{description}</FormDescription>
                        )}

                        <HookFormErrorMessage error={error}/>
                    </FormItem>
                );
            }}
        />
    );
}
