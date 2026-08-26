/**
 * @fileoverview Fieldset for managing showing start and end dates and times.
 */

import {HookFormInput} from "@/views/common/_feat";
import {Separator} from "@/views/common/_comp/ui/separator.tsx";
import {ShowingFormValues} from "@/domains/showings/_schema/form";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {cn, createFormFieldConfig, renderFields, useBaseMultiStepFormContext} from "@/common/_feat";
import {ConditionalRenderConfig} from "@/common/_types/form/HookFormFieldsetConfigTypes.ts";
import {HookFormSelect} from "@/views/common/_comp";
import {IANATimezoneOptions} from "@/common/_const";

/**
 * Form section for showing schedule inputs.
 */
export function ShowingSubmitFormDateTimeFieldset(
    {disableFields, hideFields, className}: Omit<FormFieldsetProps<ShowingFormValues>, "isNestedView">
): ReactElement {
    const {control} = useFormContext();
    const {isPending} = useBaseMultiStepFormContext();

    const field = createFormFieldConfig({disableFields, hideFields, extraDisabled: isPending});

    const fields: ConditionalRenderConfig[] = [
        field({
            key: "startAtDate",
            element: <HookFormInput
                name="startAtDate"
                label="Starting Date"
                type="date"
                control={control}
                description="Date the showing starts."
            />,
        }),
        field({
            key: "startAtTime",
            element: <HookFormInput
                name="startAtTime"
                label="Starting Time"
                type="time"
                control={control}
                description="Time the showing starts."
            />,
        }),
        field({
            key: "endAtDate",
            element: <HookFormInput
                name="endAtDate"
                label="Ending Date"
                type="date"
                control={control}
                description="Date the showing ends."
            />,
        }),
        field({
            key: "endAtTime",
            element: <HookFormInput
                name="endAtTime"
                label="Ending Time"
                type="time"
                control={control}
                description="Time the showing ends."
            />,
        }),
        field({
            key: "timezone",
            element: <HookFormSelect
                className="col-span-2"
                name="timezone"
                label="Timezone"
                description="Local timezone of the showing."
                options={IANATimezoneOptions}
            />,
        }),
    ]

    return (
        <fieldset className={cn("space-y-3", className)}>
            <div>
                <h3 className="fieldset-header">Date & Time</h3>
                <Separator/>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {renderFields({fields})}
            </div>
        </fieldset>
    );
}
