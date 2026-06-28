/**
 * @fileoverview A radio group component for selecting seat map status within a form.
 */

import {ReactElement} from "react";
import HookRadioOption from "@/common/type/input/HookRadioOption.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import HookFormRadioGroup from "@/common/components/forms/radio-group/HookFormRadioGroup.tsx";
import {FieldValues, Path, useFormContext} from "react-hook-form";
import {SeatMapStatusConstant} from "@/domains/seatmap";

/** Props for the SeatMapStatusRadioGroup component. */
type RadioGroupProps<TValues extends FieldValues> = {
    name: Path<TValues>;
    label: string;
    className?: string;
};

/**
 * Form-integrated radio group for seat map statuses. Requires a wrapping FormProvider.
 */
export function SeatMapStatusRadioGroup<TValues extends FieldValues>(
    props: RadioGroupProps<TValues>
): ReactElement {
    const {control} = useFormContext<TValues>();

    const items: HookRadioOption[] = SeatMapStatusConstant.map(
        (status): HookRadioOption => ({value: status, label: convertToTitleCase(status)}),
    );

    return (
        <HookFormRadioGroup
            {...props}
            items={items}
            control={control}
        />
    );
}
