/**
 * @fileoverview Hook Form radio group component for selecting seat layout types based on domain constants.
 */

import {Control, FieldValues, Path} from "react-hook-form";
import SeatLayoutTypeConstant from "@/domains/seats/constants/SeatLayoutTypeConstant.ts";
import SeatLayoutTypeLabelMap from "@/domains/seats/constants/SeatLayoutTypeLabelMap.ts";
import HookFormRadioGroup from "@/common/components/forms/radio-group/HookFormRadioGroup.tsx";
import HookRadioOption from "@/common/type/input/HookRadioOption.ts";
import {ReactElement} from "react";

/** Props for the SeatLayoutTypeRadioGroup component. */
type RadioGroupProps<TValues extends FieldValues> = {
    name: Path<TValues>;
    label: string;
    control: Control<TValues>;
    className?: string;
};

/**
 * Renders a controlled radio group for choosing a layout type, mapped via SeatLayoutTypeLabelMap.
 */
export function SeatLayoutTypeRadioGroup<TValues extends FieldValues>(
    props: RadioGroupProps<TValues>
): ReactElement {
    const items: HookRadioOption[] = SeatLayoutTypeConstant.map(
        (type): HookRadioOption => ({value: type, label: SeatLayoutTypeLabelMap[type]})
    );

    return (
        <HookFormRadioGroup{...props} items={items}/>
    );
}