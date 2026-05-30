/**
 * @fileoverview Shared context for managing the reservation code lookup form state.
 */

import {SetReservationCodeFormValues} from "@/domains/reservation/_feat/fetch-reservation-by-code/schemas";
import {createContext} from "react";
import {FormViewOptions} from "@/common/type/form/form-view/FormViewProps.ts";

/** Values provided by the SetReservationCodeFormContext. */
export type SetReservationCodeFormContextValues = {
    formID: string;
    options?: FormViewOptions<SetReservationCodeFormValues>;
};

/** Context for distributing reservation code form state and configuration. */
export const SetReservationCodeFormContext = createContext<SetReservationCodeFormContextValues | undefined>(undefined);