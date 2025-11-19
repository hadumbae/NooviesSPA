import { Control, FieldValues, Path } from "react-hook-form";
import SeatTypeConstant from "@/pages/seats/constants/SeatTypeConstant.ts";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";

/**
 * Props for {@link SeatTypeHookFormSelect}.
 */
type SelectProps<TSubmit extends FieldValues> = {
    /** Whether multiple seat types can be selected */
    isMulti?: boolean;
    /** Name of the field in the form */
    name: Path<TSubmit>;
    /** Label displayed above the select input */
    label: string;
    /** Optional description text for the field */
    description?: string;
    /** Optional placeholder text for the input */
    placeholder?: string;
    /** React Hook Form control object */
    control: Control<TSubmit>;
};

/**
 * A select input component for choosing seat types within a React Hook Form.
 *
 * Supports single or multiple selection and automatically generates options
 * based on {@link SeatTypeConstant}.
 *
 * Internally uses {@link HookFormSelect} for single selection or
 * {@link HookFormMultiSelect} for multi-selection.
 *
 * @typeParam TSubmit - The form values type used in React Hook Form.
 *
 * @param params - Props for the component of type {@link SelectProps}.
 *
 * @example
 * ```tsx
 * <SeatTypeHookFormSelect
 *   name="seatType"
 *   label="Seat Type"
 *   control={form.control}
 *   isMulti
 * />
 * ```
 */
const SeatTypeHookFormSelect = <TSubmit extends FieldValues>(params: SelectProps<TSubmit>) => {
    const { isMulti = false, ...selectOptions } = params;

    const options = SeatTypeConstant.map(type => ({ value: type, label: type }));

    return (
        isMulti
            ? <HookFormMultiSelect options={options} {...selectOptions} />
            : <HookFormSelect options={options} {...selectOptions} />
    );
};

export default SeatTypeHookFormSelect;
