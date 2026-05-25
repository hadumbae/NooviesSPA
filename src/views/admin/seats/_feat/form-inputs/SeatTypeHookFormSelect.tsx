/**
 * @fileoverview Hook Form select component for choosing seat types using predefined constants and labels.
 */

import {FieldValues} from "react-hook-form";
import {SeatTypeConstant} from "@/domains/seats/schema/fields";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {SeatTypeLabelMap} from "@/domains/seats/schema/fields";
import {ReactElement} from "react";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";

/**
 * Renders a selection input for seat types with labels mapped from SeatTypeLabelMap.
 */
export function SeatTypeHookFormSelect<TSubmit extends FieldValues>(
    props: HookFormInputControlProps<TSubmit>
): ReactElement {
    const options = SeatTypeConstant.map(type => ({
        value: type,
        label: SeatTypeLabelMap[type],
    }));

    return (
        <HookFormSelect options={options} {...props} />
    );
}