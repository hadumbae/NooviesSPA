/**
 * @fileoverview Fieldset component for rendering seat-specific inputs like type, pricing, and availability.
 */

import {ReactElement} from 'react';
import {useFormContext} from "react-hook-form";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {SeatFormValues} from "@/domains/seats/_feat/submit-data/schemas/SeatFormValuesSchema.ts";
import {cn} from "@/common/lib/utils.ts";
import {FormViewProps} from "@/common/features/submit-data/formTypes.ts";
import {SeatTypeHookFormSelect} from "@/views/admin/seats/_feat/form-inputs";

/** Props for the SeatSubmitFormSeatFieldset component. */
type FieldsetProps = Pick<FormViewProps<SeatFormValues>, "disableFields"> & {
    isPanel?: boolean;
};

/**
 * Renders seat metadata fields such as type, price modifier, and availability status.
 */
export function SeatSubmitFormSeatFieldset(
    {disableFields, isPanel}: FieldsetProps
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className="space-y-4">
            <div>
                <PrimaryHeaderText>Seat</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className={cn("grid gap-2", isPanel ? "grid-cols-1" : "grid-cols-2")}>
                {
                    !disableFields?.seatType &&
                    <SeatTypeHookFormSelect
                        name="seatType"
                        label="Seat Type"
                        control={control}
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
                        className={cn(!isPanel && "col-span-2")}
                        control={control}
                    />
                }
            </div>
        </fieldset>
    );
}