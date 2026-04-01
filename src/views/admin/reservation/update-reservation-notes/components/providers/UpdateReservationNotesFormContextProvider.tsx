/**
 * @file Provider component for the Reservation Notes form context.
 * @filename UpdateReservationNotesFormContextProvider.ts
 */

import {ReactNode} from "react";
import {FormViewOptions} from "@/common/type/form/form-view/FormViewProps.ts";
import {UpdateReservationNotesFormValues} from "@/domains/reservation/features/update-reservations/schemas";
import {
    UpdateReservationNotesFormContext,
    UpdateReservationNotesFormContextValues
} from "@/domains/reservation/features/update-reservations/contexts";

/**
 * Props for the {@link UpdateReservationNotesFormContextProvider}.
 */
type ProviderProps = FormViewOptions<UpdateReservationNotesFormValues> & {
    /** The UI components (inputs, labels, buttons) that require context access. */
    children: ReactNode;
    /**
     * The unique identifier for the form, used to
     * sync labels with inputs and external submit buttons.
     */
    formID: string;
};

/**
 * Context Provider that encapsulates configuration for the Reservation Notes form.
 * @param props - Form identity, UI options, and child components.
 * @returns A React Context Provider wrapping the provided children.
 */
export const UpdateReservationNotesFormContextProvider = (
    {children, formID, ...options}: ProviderProps
) => {
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