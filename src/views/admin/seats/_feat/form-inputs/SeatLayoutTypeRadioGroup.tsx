/**
 * @fileoverview Hook Form radio group component for selecting seat layout types based on domain constants.
 */

import {ReactElement} from "react";
import {FieldValues, Path, useFormContext} from "react-hook-form";
import HookFormRadioGroup from "@/common/components/forms/radio-group/HookFormRadioGroup.tsx";
import HookRadioOption from "@/common/type/input/HookRadioOption.ts";
import {SeatLayoutTypeConstant, SeatLayoutTypeLabelMap} from "@/domains/seats";

/** Props for the SeatLayoutTypeRadioGroup component. */
type RadioGroupProps<TValues extends FieldValues> = {
    name: Path<TValues>;
    label: string;
    className?: string;
};

/**
 * Renders a controlled radio group for choosing a layout type, mapped via SeatLayoutTypeLabelMap.
 */
export function SeatLayoutTypeRadioGroup<TValues extends FieldValues>(
    props: RadioGroupProps<TValues>
): ReactElement {
    const {control} = useFormContext();

    const items: HookRadioOption[] = SeatLayoutTypeConstant.map(
        (type): HookRadioOption => ({value: type, label: SeatLayoutTypeLabelMap[type]})
    );

    return (
        <HookFormRadioGroup
            {...props}
            items={items}
            control={control}
        />
    );
}