/**
 * @fileoverview A form select component for choosing a showing status.
 */

import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {FieldValues} from "react-hook-form";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {ShowingStatusConstant} from "@/domains/showings/_schema/fields/ShowingStatusConstant.ts";
import {convertToTitleCase} from "@/common/_feat/formatters/convertToTitleCase.ts";


import {ShowingFormValues} from "@/domains/showings/_schema/form";
import {ReactElement} from "react";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";

/** A controlled select input for showing statuses integrated with react-hook-form. */
export function ShowingStatusHookFormSelect<TValues extends FieldValues = ShowingFormValues>(
    props: HookFormInputControlProps<TValues>
): ReactElement {
    const options: ReactSelectOption[] = ShowingStatusConstant.map(
        status => {
            const formattedStatus = convertToTitleCase(status.replace("_", " "));
            return {label: formattedStatus, value: status};
        }
    );

    return <HookFormSelect {...props} options={options}/>;
}
