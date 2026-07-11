/**
 * @fileoverview Hook Form radio group component for selecting seat layout types based on domain constants.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {HookFormRadioGroup} from "@/views/common/_feat";
import HookRadioOption from "@/common/type/input/HookRadioOption.ts";
import {SeatLayoutTypeConstant, SeatLayoutTypeLabelMap} from "@/domains/seats";
import {HookFormInputProps} from "@/common/type/input/HookFormInputProps.ts";

/**
 * Renders a controlled radio group for choosing a layout type, mapped via SeatLayoutTypeLabelMap.
 */
export function SeatLayoutTypeRadioGroup<TValues extends FieldValues>(
    props: Omit<HookFormInputProps<TValues>, "control">
): ReactElement {
    const items: HookRadioOption[] = SeatLayoutTypeConstant.map(
        (type): HookRadioOption => ({value: type, label: SeatLayoutTypeLabelMap[type]})
    );

    return (
        <HookFormRadioGroup {...props} items={items}/>
    );
}