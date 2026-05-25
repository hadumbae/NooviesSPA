/**
 * @fileoverview A reusable, type-safe single-select component integrated with React Hook Form and react-select.
 */

import {FormControl, FormDescription, FormItem, FormLabel,} from "@/common/components/ui/form.tsx";
import {Controller, FieldValues, useFormContext} from "react-hook-form";
import Select from "react-select";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import HookFormErrorMessage from "@/common/components/forms/HookFormErrorMessage.tsx";
import {ReactSelectStyleConfig} from "@/common/constants/css/ReactSelectCSS.ts";
import {ReactElement} from "react";
import {FormSelectOnChangeHandler, FormSelectValueHandler} from "@/common/types";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";

/** Props for the HookFormSelect component. */
type SelectProps<TSubmit extends FieldValues, TValue = any> =
    Omit<HookFormInputControlProps<TSubmit>, "control"> & {
    options: ReactSelectOption<TValue>[];
    handleOnChange?: FormSelectOnChangeHandler<TSubmit, TValue>;
    handleValue?: FormSelectValueHandler<TSubmit, TValue>;
};

/**
 * A type-safe wrapper around react-select connected to React Hook Form via a Controller.
 */
export function HookFormSelect<TSubmit extends FieldValues, TValue = any>(
    props: SelectProps<TSubmit, TValue>
): ReactElement {
    const {
        name,
        label,
        description,
        className,
        disabled,
        placeholder = "Select an option.",
        options,
        hasLabel = true,
        handleOnChange,
        handleValue,
    } = props;

    const {control} = useFormContext<TSubmit>();

    return (
        <Controller control={control} name={name} render={({field, fieldState: {error}}) => {
            const id = `select-${name}`

            return (
                <FormItem className={className}>
                    {
                        hasLabel && (
                            <FormLabel htmlFor={id} className="primary-text">
                                {label}
                            </FormLabel>
                        )
                    }

                    <FormControl>
                        <Select
                            {...field}
                            inputId={id}
                            options={options}
                            isClearable={true}
                            placeholder={placeholder}
                            isDisabled={disabled}
                            classNames={ReactSelectStyleConfig}
                            unstyled={true}
                            value={
                                handleValue
                                    ? handleValue?.(options, field)
                                    : options.find(o => o.value === field.value) ?? null
                            }
                            onChange={val => {
                                if (handleOnChange) {
                                    handleOnChange(val, field);
                                } else {
                                    field.onChange(val?.value ?? null);
                                }
                            }}
                        />
                    </FormControl>

                    {
                        description &&
                        <FormDescription>{description}</FormDescription>
                    }

                    <HookFormErrorMessage error={error}/>
                </FormItem>
            );
        }}
        />
    );
}
