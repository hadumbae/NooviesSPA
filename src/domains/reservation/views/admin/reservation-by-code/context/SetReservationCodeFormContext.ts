/**
 * @file Shared context for the reservation code lookup form state.
 * @filename SetReservationUniqueCodeFormContext.ts
 */

import {SetReservationUniqueCodeFormValues} from "@/domains/reservation/views/admin/reservation-by-code/schemas";
import {createContext} from "react";
import {FormViewOptions} from "@/common/type/form/form-view/FormViewProps.ts";

/**
 * Values provided by the {@link SetReservationCodeFormContext}.
 */
export type SetReservationCodeFormContextValues = {
    /** Unique identifier used to link the form element with external submit buttons. */
    formID: string;

    /** Configuration for initial values, submission handlers, and form-view behavior. */
    options?: FormViewOptions<SetReservationUniqueCodeFormValues>;
};

/**
 * Context provider for managing and distributing reservation code form state.
 */
export const SetReservationCodeFormContext = createContext<SetReservationCodeFormContextValues | undefined>(undefined);