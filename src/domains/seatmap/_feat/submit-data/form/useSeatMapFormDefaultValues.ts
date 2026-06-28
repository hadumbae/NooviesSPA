/**
 * @fileoverview Hook for computing and stabilizing default form values for seat map submissions.
 */

import {useRef} from "react";
import {isEqual} from "lodash";
import {SeatMap} from "@/domains/seatmap/_schema";
import {SeatMapFormValues} from "@/domains/seatmap/_feat/submit-data/schema";
import {FormValuesConfig} from "@/common/_feat/submit-data";

/**
 * Computes the initial state for the seat map form by merging presets and existing entity data.
 */
export function useSeatMapFormDefaultValues(
    {presetValues, editEntity}: FormValuesConfig<SeatMapFormValues, SeatMap>
): SeatMapFormValues {
    const defaultValues: SeatMapFormValues = {
        seat: undefined,
        basePrice: "",
        priceMultiplier: "",
        overridePrice: "",
        status: undefined,
        ...editEntity,
        ...presetValues,
    };

    const heldValues = useRef<SeatMapFormValues>(defaultValues);

    if (!isEqual(heldValues.current, defaultValues)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current;
}
