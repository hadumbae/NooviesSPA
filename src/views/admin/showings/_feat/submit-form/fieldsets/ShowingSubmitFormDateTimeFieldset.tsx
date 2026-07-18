/**
 * @fileoverview Fieldset for managing showing start and end dates and times.
 */

import {HookFormInput} from "@/views/common/_feat";
import {Separator} from "@/common/components/ui/separator.tsx";
import {ShowingFormValues} from "@/domains/showings/_schema/form";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat";

/**
 * Form section for showing schedule inputs.
 */
export function ShowingSubmitFormDateTimeFieldset(
    {disableFields, className}: Omit<FormFieldsetProps<ShowingFormValues>, "isNestedView">
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className={cn("space-y-3", className)}>
            <div>
                <h3 className="fieldset-header">Date & Time</h3>
                <Separator/>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {
                    !disableFields?.startAtDate && (
                        <HookFormInput
                            name="startAtDate"
                            label="Starting Date"
                            type="date"
                            control={control}
                            description="Date the showing starts."
                        />
                    )
                }

                {
                    !disableFields?.startAtTime && (
                        <HookFormInput
                            name="startAtTime"
                            label="Starting Time"
                            type="time"
                            control={control}
                            description="Time the showing starts."
                        />
                    )
                }

                {
                    !disableFields?.endAtDate && (
                        <HookFormInput
                            name="endAtDate"
                            label="Ending Date"
                            type="date"
                            control={control}
                            description="Date the showing ends."
                        />
                    )
                }

                {
                    !disableFields?.endAtTime && (
                        <HookFormInput
                            name="endAtTime"
                            label="Ending Time"
                            type="time"
                            control={control}
                            description="Time the showing ends."
                        />
                    )
                }
            </div>
        </fieldset>
    );
}
