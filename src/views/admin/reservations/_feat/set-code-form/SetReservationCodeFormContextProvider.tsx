/**
 * @fileoverview Context provider for the reservation code lookup form.
 */

import {FormViewOptions} from "@/common/type/form/form-view/FormViewProps.ts";
import {
    SetReservationCodeFormContext,
    SetReservationCodeFormContextValues
} from "@/domains/reservation/_feat/fetch-reservation-by-code/context/SetReservationCodeFormContext.ts";
import {SetReservationCodeFormValues} from "@/domains/reservation/_feat/fetch-reservation-by-code/schemas";
import {ReactElement, ReactNode} from "react";

/** Props for the SetReservationCodeFormContextProvider component. */
type ProviderProps = FormViewOptions<SetReservationCodeFormValues> & {
    formID: string;
    children: ReactNode;
};

/**
 * Provides form identity and configuration options to the reservation code search subtree.
 */
export function SetReservationCodeFormContextProvider(
    {children, formID, ...options}: ProviderProps
): ReactElement {
    const values: SetReservationCodeFormContextValues = {
        formID,
        options,
    }

    return (
        <SetReservationCodeFormContext.Provider value={values}>
            {children}
        </SetReservationCodeFormContext.Provider>
    );
}