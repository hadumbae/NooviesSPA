/**
 * @fileoverview Form fieldset for managing seat map details.
 */

import {ReactElement} from "react";
import {Separator} from "@/views/common/_comp/ui/separator.tsx";

import {SeatMapFormValues} from "@/domains/seatmaps";
import {SeatQueryOptions} from "@/domains/seats";
import {SeatHookFormSelect} from "@/views/admin/seats";
import {SeatMapStatusRadioGroup} from "@/views/admin/seatmaps/_feat/form-input";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {cn} from "@/common/_feat";
import {ObjectId} from "@/common/_schemas";

type ViewProps = FormFieldsetProps<SeatMapFormValues> & {
    screen: ObjectId;
}

/** Renders seat selection and status fields for the seat map form. */
export function SeatMapSubmitFormDetailsFields(
    {className, disableFields, screen}: ViewProps
): ReactElement {
    const seatFilters: SeatQueryOptions = {
        screen,
        layoutType: "SEAT",
        sortByRow: 1,
        sortBySeatNumber: 1,
    };

    return (
        <fieldset className={cn("space-y-4", className)}>
            <div>
                <PageSectionHeader as="h2" text="Details"/>
                <Separator/>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {!disableFields?.seat && (
                    <SeatHookFormSelect name="seat" label="Seat" filters={seatFilters}/>
                )}

                {!disableFields?.status && (
                    <SeatMapStatusRadioGroup name="status" label="Status" className="grid grid-cols-2 gap-4"/>
                )}
            </div>
        </fieldset>
    );
}
