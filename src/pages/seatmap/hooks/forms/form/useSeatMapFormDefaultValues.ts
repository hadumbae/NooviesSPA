/**
 * @file useSeatMapFormDefaultValues.ts
 *
 * @summary React hook for computing and synchronizing default values
 * for the Seat Map form in creation or edit flows.
 *
 * @description
 * This hook determines the initial form values for a Seat Map by
 * merging schema defaults, an optional existing SeatMap model,
 * and optional preset overrides. The computed defaults are stored
 * in {@link SeatMapFormContext} and guarded against redundant updates
 * using deep equality checks.
 *
 * @remarks
 * Resolution order (lowest → highest priority):
 * 1. Schema defaults
 * 2. `seatMap` values (if editing)
 * 3. `presetValues` (caller-provided overrides)
 *
 * The hook ensures that the form's initial values remain stable
 * and avoids unnecessary re-renders.
 */

import {SeatMapFormValues} from "@/pages/seatmap/schema/form/SeatMapForm.types.ts";
import {SeatMap} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import {useContext, useEffect, useMemo, useRef} from "react";
import {isEqual} from "lodash";
import {SeatMapFormContext} from "@/pages/seatmap/context/seat-map-form-context/SeatMapFormContext.ts";

/**
 * Parameters for {@link useSeatMapFormDefaultValues}.
 */
type FormParams = {
    /**
     * Optional partial values that override computed defaults.
     *
     * Applied last, allowing explicit caller intent to take precedence
     * over schema- or model-derived values.
     */
    presetValues?: Partial<Omit<SeatMapFormValues, "showing">>;

    /**
     * Optional existing Seat Map model used to prefill the form.
     *
     * Typically provided when editing an existing Seat Map.
     */
    seatMap?: SeatMap;

    /**
     * The ID of the showing this Seat Map belongs to.
     */
    showingID: string;
};

/**
 * React hook for resolving and synchronizing Seat Map form default values.
 *
 * @param params - Parameters to configure default value resolution
 *
 * @returns
 * The resolved Seat Map form values, following this precedence:
 * 1. Current values from context
 * 2. Last initialized defaults
 * 3. Freshly computed defaults based on schema, seatMap, and presetValues
 *
 * @example
 * ```ts
 * const defaultValues = useSeatMapFormDefaultValues({
 *   seatMap,
 *   presetValues: { basePrice: "120" },
 *   showingID: "showing123",
 * });
 * ```
 */
export default function useSeatMapFormDefaultValues({presetValues, seatMap, showingID}: FormParams) {
    const formValues = useRef<SeatMapFormValues | null>(null);

    // --- Access Context ---
    const {setInitialValues, currentValues} =
    useContext(SeatMapFormContext) ?? {};

    // --- Compute Default Values ---
    const defaultValues = useMemo(
        () => ({
            seat: undefined,
            basePrice: "",
            priceMultiplier: "",
            overridePrice: "",
            status: undefined,

            ...seatMap,
            ...presetValues,

            showing: showingID,
        }),
        [seatMap, presetValues, showingID]
    );

    // --- Synchronize Defaults ---
    useEffect(() => {
        if (!isEqual(formValues.current, defaultValues)) {
            formValues.current = defaultValues;
            setInitialValues?.(defaultValues);
        }
    }, [defaultValues, setInitialValues]);

    return currentValues ?? formValues.current ?? defaultValues;
}
