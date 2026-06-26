/**
 * @fileoverview Form fieldset for managing seat map details.
 */

import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {UseFormReturn} from "react-hook-form";
import {SeatMapFormValues} from "@/domains/seatmap/schema/form/SeatMapForm.types.ts";
import SeatMapStatusRadioGroup from "@/domains/seatmap/components/forms/input/SeatMapStatusRadioGroup.tsx";
import {ReactElement} from "react";
import {SeatQueryOptions} from "@/domains/seats/_feat/handle-query-options/SeatQueryOptions.ts";
import {SeatHookFormSelect} from "@/views/admin/seats/_feat/form-inputs";

/** Props for the SeatMapFormDetailsFields component. */
type FieldProps = {
    form: UseFormReturn<SeatMapFormValues>;
    activeFields: Record<keyof SeatMapFormValues, boolean>;
    seatMapScreen: ObjectId;
};

/** Renders seat selection and status fields for the seat map form. */
export function SeatMapFormDetailsFields(props: FieldProps): ReactElement {
    const {form, activeFields, seatMapScreen} = props;

    const seatFilters: SeatQueryOptions = {
        layoutType: "SEAT",
        screen: seatMapScreen,
        sortByRow: 1,
        sortBySeatNumber: 1,
    };

    return (
        <fieldset className="space-y-4">
            <div>
                <PrimaryHeaderText as="h2">Details</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {
                    activeFields.seat &&
                    <SeatHookFormSelect
                        name="seat"
                        label="Seat"
                        filters={seatFilters}
                    />
                }

                {
                    activeFields.status &&
                    <SeatMapStatusRadioGroup
                        name="status"
                        label="Status"
                        control={form.control}
                        className="grid grid-cols-2 gap-4"
                    />
                }
            </div>
        </fieldset>
    );
}
