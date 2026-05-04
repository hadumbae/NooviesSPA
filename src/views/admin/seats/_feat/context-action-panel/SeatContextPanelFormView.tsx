/**
 * @fileoverview Form view component for the seat details panel in the admin interface.
 */

import {ReactElement} from "react";
import {SeatFormDisableFields, SeatSubmitFormButtons, SeatSubmitFormView} from "@/views/admin/seats/_feat/submit-data";

/** Renders the seat context panel form view containing the "submit" and "reset" buttons. */
export function SeatContextPanelFormView(): ReactElement {
    const disableFields: SeatFormDisableFields = {
        theatre: true,
        screen: true,
    };

    return (
        <div className="space-y-5">
            <SeatSubmitFormView disableFields={disableFields} isNestedView={true}/>
            <SeatSubmitFormButtons/>
        </div>
    );
}