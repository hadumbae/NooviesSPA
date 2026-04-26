/**
 * @fileoverview Hook for merging and stabilizing default form values for seat creation and editing.
 */

import {useEffect, useMemo, useRef} from "react";
import {SeatFormValues} from "@/domains/seats/_feat/submit-data/schemas/SeatFormValuesSchema.ts";
import {Seat} from "@/domains/seats/schema/seat/Seat.types.ts";
import {isEqual} from "lodash";

/** Props for the useSeatSubmitFormDefaultValues hook. */
type ValuesParams = {
    presetValues?: Partial<SeatFormValues>;
    seat?: Seat;
};

/**
 * Computes a stable default values object by merging baseline defaults, existing seat data, and manual presets.
 */
export function useSeatSubmitFormDefaultValues(
    {presetValues, seat}: ValuesParams = {}
): SeatFormValues {
    const heldValues = useRef<SeatFormValues | null>(null);

    const defaultValues: SeatFormValues = useMemo(() => ({
        layoutType: "SEAT",
        row: "",
        x: 1,
        y: 1,
        theatre: undefined,
        screen: undefined,
        seatNumber: 1,
        seatLabel: "",
        seatType: "REGULAR",
        isAvailable: true,
        priceMultiplier: 1,
        ...seat,
        ...presetValues,
    }), [seat, presetValues]);

    useEffect(() => {
        if (!isEqual(heldValues.current, defaultValues)) {
            heldValues.current = defaultValues;
        }
    }, [defaultValues, seat]);

    return heldValues.current ?? defaultValues;
}