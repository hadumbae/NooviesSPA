/**
 * @file React Context definition for the Reservation Notes update form.
 * @filename UpdateReservationNotesFormContext.ts
 */

import {FormViewOptions} from "@/common/type/form/form-view/FormViewProps.ts";
import {UpdateReservationNotesFormValues} from "@/domains/reservation/features/update-reservations/schemas";
import {createContext} from "react";

/**
 * Values provided by the {@link UpdateReservationNotesFormContext}.
 */
export type UpdateReservationNotesFormContextValues = {
    /** The unique DOM identifier for the form element. */
    formID: string;

    /** * Optional UI configuration for the form view, such as field labels
     * or custom submission button text.
     */
    options?: FormViewOptions<UpdateReservationNotesFormValues>;
};

/**
 * Context used to share form-level configuration across the Reservation
 * Notes feature sub-components (e.g., Form Header, Input Fields, Actions).
 */
export const UpdateReservationNotesFormContext = createContext<UpdateReservationNotesFormContextValues | undefined>(undefined);