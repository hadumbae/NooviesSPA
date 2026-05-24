/**
 * @fileoverview Fieldset component for rendering row and seat identification fields within the seat form.
 */

import {ReactElement} from 'react';
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {useFormContext} from "react-hook-form";
import {SeatFormValues} from "@/domains/seats/_feat/submit-data/schemas/SeatFormValuesSchema.ts";
import {cn} from "@/common/lib/utils.ts";
import {FormViewProps} from "@/common/_feat/submit-data/formTypes.ts";

/** Renders inputs for Row, Seat Number, and Seat Label, adapting the grid layout based on the display context. */
export function SeatSubmitFormRowFieldset(
    {disableFields, isNestedView, className}: FormViewProps<SeatFormValues>
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className={cn("space-y-2", className)}>
            <div>
                <PrimaryHeaderText>Row</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className={cn("grid gap-2", isNestedView ? "grid-cols-2" : "grid-cols-3")}>
                {
                    !disableFields?.row &&
                    <HookFormInput
                        name="row"
                        label="Row"
                        control={control}
                    />
                }

                {
                    !disableFields?.seatNumber &&
                    <HookFormInput
                        name="seatNumber"
                        label="Number"
                        type="number"
                        min={1}
                        step={1}
                        control={control}
                    />
                }

                {
                    !disableFields?.seatLabel &&
                    <HookFormInput
                        name="seatLabel"
                        label="Label"
                        control={control}
                        className={isNestedView ? "col-span-2" : "col-span-1"}
                    />
                }
            </div>
        </fieldset>
    );
}