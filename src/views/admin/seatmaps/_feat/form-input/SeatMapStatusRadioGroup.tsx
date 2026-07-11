/**
 * @fileoverview A radio group component for selecting seat map status within a form.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {HookFormRadioGroup} from "@/views/common/_feat";
import HookRadioOption from "@/common/type/input/HookRadioOption.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import {SeatMapStatusConstant} from "@/domains/seatmaps";
import {HookFormInputProps} from "@/common/type/input/HookFormInputProps.ts";

/**
 * Form-integrated radio group for seat map statuses. Requires a wrapping FormProvider.
 */
export function SeatMapStatusRadioGroup<TValues extends FieldValues>(
    props: Omit<HookFormInputProps<TValues>, "control">
): ReactElement {
    const items: HookRadioOption[] = SeatMapStatusConstant.map(
        (status): HookRadioOption => ({value: status, label: convertToTitleCase(status)}),
    );

    return (
        <HookFormRadioGroup {...props} items={items}/>
    );
}
