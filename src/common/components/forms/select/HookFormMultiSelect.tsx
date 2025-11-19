/**
 * @file HookFormMultiSelect.tsx
 * @description
 * A reusable, type-safe multi-select component integrated with React Hook Form.
 * Built on top of `react-select`, this component supports:
 *
 * - Multiple selections (`isMulti`)
 * - Typed form binding via generics (`TSubmit extends FieldValues`)
 * - Placeholder support
 * - Optional description text
 * - Disabled state
 * - Error message display with `HookFormErrorMessage`
 * - Custom styling via `ReactSelectMultiStyleConfig` (unstyled mode enabled)
 *
 * Designed for forms using Zod schemas, strong typing, and React Hook Form validation.
 *
 * @example
 * <HookFormMultiSelect
 *    name="fruits"
 *    label="Favorite Fruits"
 *    description="Select one or more fruits"
 *    control={control}
 *    options={[
 *      { label: "Apple", value: "apple" },
 *      { label: "Banana", value: "banana" },
 *      { label: "Orange", value: "orange" }
 *    ]}
 * />
 */

import Select from "react-select";
import {Control, Controller, FieldValues, Path} from "react-hook-form";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import {
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
} from "@/common/components/ui/form.tsx";
import HookFormErrorMessage from "@/common/components/forms/HookFormErrorMessage.tsx";
import {cn} from "@/common/lib/utils.ts";
import {ReactSelectMultiStyleConfig} from "@/common/constants/css/ReactSelectCSS.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for the `HookFormMultiSelect` component.
 *
 * @template TSubmit - A type extending `FieldValues` from React Hook Form.
 */
export type SelectProps<TSubmit extends FieldValues> = {
    /** Form field name (must match a valid key in the form schema) */
    name: Path<TSubmit>;
    /** Label text displayed above the select input */
    label: string;
    /** Optional description rendered below the input */
    description?: string;
    /** Placeholder text shown when no values are selected */
    placeholder?: string;
    /** React Hook Form control object for managing state */
    control: Control<TSubmit>;
    /** Whether the select input is disabled */
    isDisabled?: boolean;
    /** Array of selectable options */
    options: ReactSelectOption[];
    /** Optional className override for the outer container */
    className?: string;
};

/**
 * A reusable multi-select component connected to a React Hook Form field.
 * Uses `react-select` for UI behavior and styling while providing strict type
 * safety for form interaction.
 *
 * Features:
 * - Multi-value selection with typed form output
 * - Optional descriptions
 * - Error message rendering
 * - Custom styling via `classNames` (unstyled mode)
 *
 * @template TSubmit - A type describing form values.
 *
 * @param {SelectProps<TSubmit>} props - Configuration for the multi-select input.
 * @returns {JSX.Element} The rendered multi-select form field.
 *
 * @example
 * <HookFormMultiSelect
 *    name="hobbies"
 *    label="Hobbies"
 *    control={control}
 *    options={[
 *      { label: "Reading", value: "reading" },
 *      { label: "Swimming", value: "swimming" },
 *      { label: "Gaming", value: "gaming" }
 *    ]}
 *    description="Select all that apply"
 * />
 */
const HookFormMultiSelect = <TSubmit extends FieldValues>(
    props: SelectProps<TSubmit>
): JSX.Element => {
    const {
        name,
        label,
        description,
        control,
        placeholder,
        isDisabled,
        className,
        options = [],
    } = props;

    return (
        <Controller
            control={control}
            name={name}
            render={({field, fieldState: {error}}) => (
                <FormItem className={cn(className)}>
                    <FormLabel className={PrimaryTextBaseCSS}>{label}</FormLabel>

                    <FormControl>
                        <Select
                            options={options}
                            isMulti={true}
                            value={options.filter(v => field.value?.includes(v.value))}
                            onChange={value => field.onChange(value.map(v => v.value))}
                            placeholder={placeholder}
                            isDisabled={isDisabled}
                            classNames={ReactSelectMultiStyleConfig}
                            unstyled={true}
                        />
                    </FormControl>

                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}

                    <HookFormErrorMessage error={error}/>
                </FormItem>
            )}
        />
    );
};

export default HookFormMultiSelect;
