/**
 * @file SeatTypeHookFormSelect
 *
 * Provides a typed React Hook Form select component for choosing a seat type.
 * This component generates its options from {@link SeatTypeConstant} and
 * formats human-readable labels using {@link SeatTypeLabelMap}.
 *
 * It wraps the shared {@link HookFormSelect} component to ensure consistent
 * form rendering across the application.
 */

import {Control, FieldValues, Path} from "react-hook-form";
import SeatTypeConstant from "@/pages/seats/constants/SeatTypeConstant.ts";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import SeatTypeLabelMap from "@/pages/seats/constants/SeatTypeLabelMap.ts";
import {ReactElement} from "react";

/**
 * @typedef SelectProps
 * @template TSubmit
 *
 * Props for {@link SeatTypeHookFormSelect}.
 *
 * @property {Path<TSubmit>} name
 * The field name within the form.
 *
 * @property {string} label
 * The text label displayed above the select field.
 *
 * @property {string} [description]
 * Optional helper or descriptive text for the field.
 *
 * @property {string} [placeholder]
 * Optional placeholder text displayed when no value is selected.
 *
 * @property {Control<TSubmit>} control
 * The React Hook Form control object used to bind the field.
 */
type SelectProps<TSubmit extends FieldValues> = {
    name: Path<TSubmit>;
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<TSubmit>;
};

/**
 * @function SeatTypeHookFormSelect
 * @template TSubmit
 *
 * A typed select component for choosing a single seat type in a React Hook Form.
 *
 * The component:
 * - Builds its options list from {@link SeatTypeConstant}.
 * - Converts internal seat type identifiers into display labels via
 *   {@link SeatTypeLabelMap}.
 * - Delegates UI and behavior to {@link HookFormSelect}.
 *
 * @param {SelectProps<TSubmit>} props
 * The configuration object for the select input.
 *
 * @returns {React.ReactElement}
 * A fully configured select input for seat type selection.
 *
 * @example
 * ```tsx
 * const form = useForm<SeatFormValues>();
 *
 * <SeatTypeHookFormSelect
 *   name="seatType"
 *   label="Seat Type"
 *   placeholder="Choose a type"
 *   control={form.control}
 * />
 * ```
 */
const SeatTypeHookFormSelect = <TSubmit extends FieldValues>(
    props: SelectProps<TSubmit>
): ReactElement => {

    const options = SeatTypeConstant.map(type => ({
        value: type,
        label: SeatTypeLabelMap[type],
    }));

    return (
        <HookFormSelect
            options={options}
            {...props}
        />
    );
};

export default SeatTypeHookFormSelect;
