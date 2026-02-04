/**
 * @file useReserveTicketFormDefaultValues.ts
 *
 * Provides stable default values for the reserve ticket form.
 *
 * This hook ensures that form default values:
 * - are initialized once
 * - remain referentially stable across renders
 * - only update when their structural values truly change
 *
 * This prevents unintended form resets when used with
 * form libraries that rely on referential equality
 * (e.g. React Hook Form).
 */

import {useMemo, useRef} from "react";
import {ReserveTicketFormValues} from "@/pages/reservation/schema/forms/ReserveTicketFormValuesSchema.ts";
import {isEqual} from "lodash";

type FormParams = {
    /**
     * Optional preset values to influence initial defaults.
     *
     * Intended for prefilled or resumed reservation flows.
     */
    presetValues?: Partial<ReserveTicketFormValues>;
};

/**
 * Returns a stable set of default form values for ticket reservation.
 *
 * @param params - Form initialization parameters
 *
 * @returns Stable default values object for the reservation form
 */
export function useReserveTicketFormDefaultValues(
    {presetValues}: FormParams = {}
): ReserveTicketFormValues {
    const defaultValues = useRef<ReserveTicketFormValues | null>(null);

    const initialValues = useMemo(
        (): ReserveTicketFormValues => ({
            showing: undefined,
            ticketCount: 0,
            currency: undefined,
            reservationType: "GENERAL_ADMISSION",
            selectedSeating: [],
            ...presetValues,
        }),
        [presetValues],
    );

    if (!isEqual(initialValues, defaultValues.current)) {
        defaultValues.current = initialValues;
    }

    return defaultValues.current ?? initialValues;
}
