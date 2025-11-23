/**
 * @file HookFormSelect.tsx
 * @description
 * A reusable, type-safe single-select component integrated with React Hook Form,
 * built on top of `react-select`. Includes full support for:
 * - Typed form bindings via generics (`TSubmit extends FieldValues`)
 * - Placeholder fallback
 * - Optional description text
 * - Error display using `HookFormErrorMessage`
 * - Disabled state
 * - Custom `react-select` className injection via `ReactSelectStyleConfig`
 *
 * This component is intended for use inside forms where type inference,
 * Zod schemas, and React Hook Form integration are important.
 *
 * @example
 * <HookFormSelect
 *    name="country"
 *    label="Country"
 *    description="Select your country of residence"
 *    control={control}
 *    options={[
 *       { label: "Thailand", value: "th" },
 *       { label: "Japan", value: "jp" },
 *    ]}
 * />
 */

import {
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
} from "@/common/components/ui/form.tsx";
import {Control, Controller, FieldValues, Path} from "react-hook-form";
import Select from "react-select";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import HookFormErrorMessage from "@/common/components/forms/HookFormErrorMessage.tsx";
import {cn} from "@/common/lib/utils.ts";
import {ReactSelectStyleConfig} from "@/common/constants/css/ReactSelectCSS.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for the `HookFormSelect` component.
 *
 * @template TSubmit - A type extending `FieldValues` used by React Hook Form.
 */
export type SelectProps<TSubmit extends FieldValues> = {
    /** The field name (must map to a key in the form schema) */
    name: Path<TSubmit>;
    /** Label displayed above the select input */
    label: string;
    /** Optional description displayed below the label */
    description?: string;
    /** Placeholder text when no value is selected */
    placeholder?: string;
    /** React Hook Form control object */
    control: Control<TSubmit>;
    /** Whether the select input is disabled */
    isDisabled?: boolean;
    /** Array of selectable options */
    options: ReactSelectOption[];
    /** Optional CSS class overrides for the wrapper */
    className?: string;
};

/**
 * `HookFormSelect` is a reusable, type-safe wrapper around `react-select`,
 * connected to React Hook Form via `Controller`.
 *
 * Features:
 * - Fully typed generics for form integration
 * - Customizable placeholder and disabled state
 * - Styled via `ReactSelectStyleConfig` (unstyled mode enabled)
 * - Automatically binds form value to selected option
 * - Displays form-level errors using `HookFormErrorMessage`
 *
 * @template TSubmit - The form value type extending `FieldValues`.
 *
 * @param {SelectProps<TSubmit>} props - Component configuration props.
 * @returns {JSX.Element} A controlled single-select form field.
 *
 * @example
 * <HookFormSelect
 *    name="language"
 *    label="Preferred Language"
 *    control={control}
 *    options={[
 *      { label: "English", value: "en" },
 *      { label: "Mandarin", value: "zh" },
 *    ]}
 *    isDisabled={false}
 *    placeholder="Select language"
 * />
 */
const HookFormSelect = <TSubmit extends FieldValues>(
    props: SelectProps<TSubmit>
) => {
    const {
        name,
        label,
        description,
        className,
        control,
        isDisabled,
        placeholder = "Select an option.",
        options,
    } = props;

    return (
        <Controller
            control={control}
            name={name}
            render={({field, fieldState: {error}}) => {
                const id = `select-${name}`

                return (
                    <FormItem className={cn(className)}>
                        <FormLabel htmlFor={id} className={PrimaryTextBaseCSS}>
                            {label}
                        </FormLabel>

                        <FormControl>
                            <Select
                                {...field}
                                inputId={id}
                                options={options}
                                isClearable={true}
                                value={options.find(o => o.value === field.value) || null}
                                onChange={val => field.onChange(val ? val.value : null)}
                                placeholder={placeholder}
                                isDisabled={isDisabled}
                                classNames={ReactSelectStyleConfig}
                                unstyled={true}
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
};

export default HookFormSelect;
