/**
 * @file SeatLayoutTypeHookFormSelect
 *
 * A typed React Hook Form select component for choosing a seat layout type.
 * Generates options from {@link SeatLayoutTypeConstant} and formats readable
 * labels using {@link SeatLayoutTypeLabelMap}. Uses {@link HookFormSelect} for
 * consistent form UI rendering.
 */

import { Control, FieldValues, Path } from "react-hook-form";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import SeatLayoutTypeConstant from "@/pages/seats/constants/SeatLayoutTypeConstant.ts";
import SeatLayoutTypeLabelMap from "@/pages/seats/constants/SeatLayoutTypeLabelMap.ts";
import {ReactElement} from "react";

/**
 * @typedef SelectProps
 * @template TSubmit
 *
 * Props for {@link SeatLayoutTypeHookFormSelect}.
 *
 * @property {Path<TSubmit>} name
 * The field name within the form.
 *
 * @property {string} label
 * The text label displayed above the select input.
 *
 * @property {string} [description]
 * Optional helper or descriptive text.
 *
 * @property {string} [placeholder]
 * Optional placeholder shown when no value is selected.
 *
 * @property {Control<TSubmit>} control
 * React Hook Form control object used to bind the field.
 */
type SelectProps<TSubmit extends FieldValues> = {
    name: Path<TSubmit>;
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<TSubmit>;
};

/**
 * @function SeatLayoutTypeHookFormSelect
 * @template TSubmit
 *
 * A typed select input for choosing a seat layout type in a React Hook Form.
 *
 * The component:
 * - Sources its options from {@link SeatLayoutTypeConstant}.
 * - Maps layout values to user-friendly labels via {@link SeatLayoutTypeLabelMap}.
 * - Delegates rendering and binding behavior to {@link HookFormSelect}.
 *
 * @param {SelectProps<TSubmit>} props
 * Props configuring the select input.
 *
 * @returns {React.ReactElement}
 * A configured `<HookFormSelect>` for choosing a layout type.
 *
 * @example
 * ```tsx
 * const form = useForm<SeatFormValues>();
 *
 * <SeatLayoutTypeHookFormSelect
 *   name="layoutType"
 *   label="Layout Type"
 *   control={form.control}
 * />
 * ```
 */
const SeatLayoutTypeHookFormSelect = <TSubmit extends FieldValues>(
    props: SelectProps<TSubmit>
): ReactElement => {

    const options = SeatLayoutTypeConstant.map(type => ({
        value: type,
        label: SeatLayoutTypeLabelMap[type],
    }));

    return (
        <HookFormSelect
            options={options}
            {...props}
        />
    );
};

export default SeatLayoutTypeHookFormSelect;
