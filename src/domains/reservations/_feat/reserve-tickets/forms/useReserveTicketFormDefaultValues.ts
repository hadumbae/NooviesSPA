/**
 * @fileoverview Provides referentially stable default values for the ticket reservation form.
 */

import {useRef} from "react";
import {isEqual} from "lodash";
import {ReserveTicketFormValues} from "@/domains/reservations/_feat/reserve-tickets/schema/ReserveTicketFormSchema.ts";

/** Configuration for initializing reservation form defaults. */
type FormParams = {
    presetValues?: Partial<ReserveTicketFormValues>;
};

/**
 * Generates stable default values for the reservation form to prevent unintended resets.
 */
export function useReserveTicketFormDefaultValues(
    {presetValues}: FormParams = {},
): ReserveTicketFormValues {
    const defaultValues = {
        showing: undefined,
        ticketCount: 0,
        currency: undefined,
        reservationType: "GENERAL_ADMISSION",
        selectedSeating: [],
        ...presetValues,
    };

    const heldValues = useRef<ReserveTicketFormValues>(defaultValues);

    if (!isEqual(defaultValues, heldValues.current)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current;
}
