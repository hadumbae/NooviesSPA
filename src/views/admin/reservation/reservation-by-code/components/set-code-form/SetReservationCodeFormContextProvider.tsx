/**
 * @file Context provider component for the reservation code lookup form.
 * @filename SetReservationUniqueCodeFormProvider.tsx
 */

import {FormViewOptions} from "@/common/type/form/form-view/FormViewProps.ts";
import {
    SetReservationCodeFormContext,
    SetReservationCodeFormContextValues
} from "@/domains/reservation/views/admin/reservation-by-code/context/SetReservationCodeFormContext.ts";
import {SetReservationCodeFormValues} from "@/domains/reservation/views/admin/reservation-by-code/schemas";
import {ReactNode} from "react";

/**
 * Props for the {@link SetReservationCodeFormContextProvider} component.
 */
type ProviderProps = FormViewOptions<SetReservationCodeFormValues> & {
    /** The HTML id attribute used to identify the form in the DOM. */
    formID: string;

    /** The component tree that requires access to the form context. */
    children: ReactNode;
};

/**
 * Provides form identity and configuration options to the reservation code search subtree.
 */
export const SetReservationCodeFormContextProvider = (
    {children, formID, ...options}: ProviderProps
) => {
    const values: SetReservationCodeFormContextValues = {
        formID,
        options,
    }

    return (
        <SetReservationCodeFormContext.Provider value={values}>
            {children}
        </SetReservationCodeFormContext.Provider>
    );
};