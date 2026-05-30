/**
 * @fileoverview Provider component for the Reservation Notes form context.
 */

import {ReactNode} from "react";
import {FormViewOptions} from "@/common/type/form/form-view/FormViewProps.ts";
import {
    UpdateReservationNotesFormSubmit,
} from "@/domains/reservation/_feat/update-reservations/schemas";
import {
    UpdateReservationNotesFormContext,
    UpdateReservationNotesFormContextValues
} from "@/domains/reservation/_feat/update-reservations";

/** Props for the UpdateReservationNotesFormContextProvider component. */
type ProviderProps = FormViewOptions<UpdateReservationNotesFormSubmit> & {
    children: ReactNode;
    formID: string;
};

/** Context provider that encapsulates configuration for the Reservation Notes form. */
export const UpdateReservationNotesFormContextProvider = ({
    children, formID, ...options}: ProviderProps) => {
    const values: UpdateReservationNotesFormContextValues = {
        formID,
        options,
    };

    return (
        <UpdateReservationNotesFormContext.Provider value={values}>
            {children}
        </UpdateReservationNotesFormContext.Provider>
    );
};