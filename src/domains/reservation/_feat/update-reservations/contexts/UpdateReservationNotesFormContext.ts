/**
 * @fileoverview React Context definition for the Reservation Notes update form.
 */

import {FormViewOptions} from "@/common/type/form/form-view/FormViewProps.ts";
import {createContext} from "react";
import {UpdateReservationNotesFormSubmit} from "@/domains/reservation/_feat/update-reservations/schemas";

/** Values provided by the UpdateReservationNotesFormContext. */
export type UpdateReservationNotesFormContextValues = {
    formID: string;
    options?: FormViewOptions<UpdateReservationNotesFormSubmit>;
};

/** Context used to share form-level configuration across the Reservation Notes feature sub-components. */
export const UpdateReservationNotesFormContext = createContext<UpdateReservationNotesFormContextValues | undefined>(undefined);