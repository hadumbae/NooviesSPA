/**
 * @fileoverview Fieldset containing the core identity and capacity fields for a Theatre form.
 */

import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat";
import {Separator} from "@/views/common/_comp/ui";
import {HookFormInput} from "@/views/common/_feat";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {TheatreFormValues} from "@/domains/theatres/_feat/submit-data";

/**
 * Renders form fields for a theatre's name and seat capacity.
 */
export function TheatreSubmitFormDetailsFieldset(
    {disableFields, hideFields, className}: FormFieldsetProps<TheatreFormValues>
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className="space-y-4">
            <div>
                <h3 className="fieldset-header">Theatre</h3>
                <Separator/>
            </div>

            <div className={cn("grid grid-cols-1 gap-4", className)}>
                {
                    !hideFields?.name &&
                    <HookFormInput
                        name="name"
                        label="Name"
                        control={control}
                        disabled={disableFields?.name}
                    />
                }

                {
                    !hideFields?.seatCapacity &&
                    <HookFormInput
                        name="seatCapacity"
                        label="Number Of Seats (Capacity)"
                        type="number"
                        min={0}
                        control={control}
                        disabled={disableFields?.seatCapacity}
                    />
                }
            </div>
        </fieldset>
    );
}