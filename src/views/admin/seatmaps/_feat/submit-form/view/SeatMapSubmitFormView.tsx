/**
 * @fileoverview Form view component for creating or editing seat map configurations.
 */

import {ReactElement} from "react";
import {Loader} from "lucide-react";
import {DisableFields} from "@/common/types";
import {cn} from "@/common/lib/utils.ts";
import {Button} from "@/common/components/ui";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {ObjectId} from "@/common/_schemas";

import {SeatMapFormValues} from "@/domains/seatmaps";
import {SeatMapSubmitFormDetailsFields, SeatMapSubmitFormPriceFields} from "@/views/admin/seatmaps/_feat/submit-form/fieldsets";

/** Props for the SeatMapFormView component. */
type ViewProps = {
    className?: string;
    screenForSeats: ObjectId;
    disableFields?: DisableFields<SeatMapFormValues>;
    isNestedView?: boolean;
};

/**
 * Renders the layout for seat map form fields and the submission trigger.
 * Requires wrapping in a BaseFormContext provider.
 */
export function SeatMapSubmitFormView(
    {className, screenForSeats, disableFields, isNestedView}: ViewProps
): ReactElement {
    const {isPending} = useBaseFormContext();

    return (
        <div className={cn("space-y-4", className)}>
            <SeatMapSubmitFormDetailsFields disableFields={disableFields} screen={screenForSeats}/>
            <SeatMapSubmitFormPriceFields disableFields={disableFields} isNestedView={isNestedView}/>

            <Button variant="default" type="submit" className="w-full">
                {isPending ? <Loader className="animate-spin"/> : "Submit"}
            </Button>
        </div>
    );
}
