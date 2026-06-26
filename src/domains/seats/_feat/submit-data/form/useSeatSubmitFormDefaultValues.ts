/**
 * @fileoverview Hook for merging and stabilising default form values for seat creation and editing.
 */

import {useRef} from "react";
import {isEqual} from "lodash";
import {SeatFormValues} from "@/domains/seats/_feat/submit-data/schema";
import {FormValuesConfig} from "@/common/_feat/submit-data";
import {Seat} from "@/domains/seats";

/**
 * Computes a stable default values object by merging baseline defaults, existing seat data, and manual presets.
 */
export function useSeatSubmitFormDefaultValues(
    {presetValues, editEntity}: FormValuesConfig<SeatFormValues, Seat> = {}
): SeatFormValues {
    const defaultValues: SeatFormValues = {
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
        ...editEntity,
        ...presetValues,
    };

    const heldValues = useRef<SeatFormValues>(defaultValues);

    if (!isEqual(heldValues.current, defaultValues)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current;
}