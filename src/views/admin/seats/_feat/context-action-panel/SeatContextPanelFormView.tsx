/**
 * @fileoverview Form view component for the seat details panel in the admin interface.
 */

import {ReactElement} from "react";
import {SeatSubmitFormActions, SeatSubmitFormView} from "@/views/admin/seats/_feat/submit-data";
import {DisableFields} from "@/common/_types";
import {SeatFormValues} from "@/domains/seats";

/** Renders the seat context panel form view containing the "submit" and "reset" buttons. */
export function SeatContextPanelFormView(): ReactElement {
    const disableFields: DisableFields<SeatFormValues> = {
        theatre: true,
        screen: true,
    };

    return (
        <div className="space-y-5">
            <SeatSubmitFormView disableFields={disableFields} isNestedView={true}/>
            <SeatSubmitFormActions/>
        </div>
    );
}