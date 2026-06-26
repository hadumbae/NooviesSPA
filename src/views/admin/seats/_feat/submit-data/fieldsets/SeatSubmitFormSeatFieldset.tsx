/**
 * @fileoverview Fieldset component for rendering seat-specific inputs like type, pricing, and availability.
 */

import {ReactElement} from 'react';
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import {Separator} from "@/common/components/ui";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {SeatTypeHookFormSelect} from "@/views/admin/seats/_feat/form-inputs";
import {SeatFormValues} from "@/domains/seats";


/** Renders seat metadata fields such as type, price modifier, and availability status. */
export function SeatSubmitFormSeatFieldset(
    {disableFields, isNestedView, className}: FormFieldsetProps<SeatFormValues>,
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className={cn("space-y-4", className)}>
            <div>
                <PrimaryHeaderText>Seat</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className={cn("grid gap-2", isNestedView ? "grid-cols-1" : "grid-cols-2")}>
                {
                    !disableFields?.seatType &&
                    <SeatTypeHookFormSelect
                        name="seatType"
                        label="Seat Type"
                    />
                }

                {
                    !disableFields?.priceMultiplier &&
                    <HookFormInput
                        name="priceMultiplier"
                        label="Price Multiplier"
                        type="number"
                        min={0}
                        step={0.01}
                        control={control}
                    />
                }

                {
                    !disableFields?.isAvailable &&
                    <HookFormCheckbox
                        name="isAvailable"
                        label="Is Available?"
                        className={cn(!isNestedView && "col-span-2")}
                        control={control}
                    />
                }
            </div>
        </fieldset>
    );
}