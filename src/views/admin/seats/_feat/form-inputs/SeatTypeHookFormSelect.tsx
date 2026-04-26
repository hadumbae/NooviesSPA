/**
 * @fileoverview Hook Form select component for choosing seat types using predefined constants and labels.
 */

import {Control, FieldValues, Path} from "react-hook-form";
import SeatTypeConstant from "@/domains/seats/constants/SeatTypeConstant.ts";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import SeatTypeLabelMap from "@/domains/seats/constants/SeatTypeLabelMap.ts";
import {ReactElement} from "react";

/** Props for the SeatTypeHookFormSelect component. */
type SelectProps<TSubmit extends FieldValues> = {
    name: Path<TSubmit>;
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<TSubmit>;
};

/**
 * Renders a selection input for seat types with labels mapped from SeatTypeLabelMap.
 */
export function SeatTypeHookFormSelect<TSubmit extends FieldValues>(
    props: SelectProps<TSubmit>
): ReactElement {

    const options = SeatTypeConstant.map(type => ({
        value: type,
        label: SeatTypeLabelMap[type],
    }));

    return (
        <HookFormSelect options={options}{...props} />
    );
}