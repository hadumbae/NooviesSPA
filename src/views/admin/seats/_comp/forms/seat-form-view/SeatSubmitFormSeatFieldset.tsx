/**
 * @fileoverview Fieldset component for rendering seat-specific inputs like type, pricing, and availability.
 */

import {FC} from 'react';
import {UseFormReturn} from "react-hook-form";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {SeatFormValues} from "@/domains/seats/_feat/submit-data/schemas/SeatFormValuesSchema.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatFormContext} from "@/domains/seats/context/form/SeatFormContext.ts";
import {cn} from "@/common/lib/utils.ts";
import {SeatTypeHookFormSelect} from "@/views/admin/seats/_comp/inputs";

/** Props for the SeatSubmitFormSeatFieldset component. */
type FieldsetProps = {
    form: UseFormReturn<SeatFormValues>;
    activeFields: Record<keyof SeatFormValues, boolean>;
};

/**
 * Renders seat metadata fields conditionally based on form state.
 * Requires wrapping in a SeatFormContext provider.
 */
const SeatSubmitFormSeatFieldset: FC<FieldsetProps> = ({form, activeFields}) => {
    const {options: {isPanel} = {}} = useRequiredContext({
        context: SeatFormContext,
        message: "Must use within a provider for `SeatFormContext`.",
    });

    return (
        <fieldset className="space-y-4">
            <div>
                <PrimaryHeaderText>Seat</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className={cn(
                "grid gap-2",
                isPanel ? "grid-cols-1" : "grid-cols-2",
            )}>
                {
                    activeFields["seatType"] &&
                    <SeatTypeHookFormSelect
                        name="seatType"
                        label="Seat Type"
                        control={form.control}
                    />
                }

                {
                    activeFields["priceMultiplier"] &&
                    <HookFormInput
                        name="priceMultiplier"
                        label="Price Multiplier"
                        type="number"
                        min={0}
                        step={0.01}
                        control={form.control}
                    />
                }

                {
                    activeFields["isAvailable"] &&
                    <HookFormCheckbox
                        name="isAvailable"
                        label="Is Available?"
                        className={cn(!isPanel && "col-span-2")}
                        control={form.control}
                    />
                }
            </div>
        </fieldset>
    );
};

export default SeatSubmitFormSeatFieldset;