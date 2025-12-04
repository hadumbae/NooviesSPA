/**
 * @file useSeatSubmitFormDefaultValues.ts
 *
 * Provides a stable, merged set of default values for the Seat submit form.
 *
 * Default values are merged in the following priority:
 *
 * 1. Internal baseline defaults (blank seat definition)
 * 2. Values from an existing `Seat` entity (for editing)
 * 3. Developer-provided `presetValues` (highest priority)
 *
 * Referential stability is ensured using a `ref` so React Hook Form treats
 * the default object as the same across renders. The hook also integrates
 * with {@link SeatFormContext}, updating `initialValues` when defaults change.
 */

import {useEffect, useMemo, useRef} from "react";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatFormContext} from "@/pages/seats/context/form/SeatFormContext.ts";
import {isEqual} from "lodash";

/**
 * Parameters for {@link useSeatSubmitFormDefaultValues}.
 */
type ValuesParams = {
    /**
     * Partial form values that override all other defaults.
     * Useful for pre-filling fields from parent UI logic.
     */
    presetValues?: Partial<SeatFormValues>;

    /**
     * Existing `Seat` entity. Properties are applied before `presetValues`
     * when merging defaults, typically used in edit workflows.
     */
    seat?: Seat;
};

/**
 * Hook: useSeatSubmitFormDefaultValues
 *
 * Produces a stable {@link SeatFormValues} object for use as default values
 * in React Hook Form (`useForm({ defaultValues })`), ensuring that the object
 * identity remains consistent across renders.
 *
 * Behavior:
 * - Merges defaults → `seat` → `presetValues` in order of priority
 * - Maintains a stable reference in a ref to prevent unnecessary re-renders
 * - Updates the `initialValues` in {@link SeatFormContext} when defaults change
 * - Returns `currentValues` from context if already set, falling back to the merged defaults
 *
 * @param params - Optional `seat` entity or `presetValues`.
 * @returns A stable {@link SeatFormValues} object for React Hook Form.
 *
 * @example
 * ```tsx
 * const defaultValues = useSeatSubmitFormDefaultValues({
 *   seat: existingSeat,
 *   presetValues: { isAvailable: false }
 * });
 *
 * const form = useForm({ defaultValues });
 * ```
 */
export default function useSeatSubmitFormDefaultValues(
    {presetValues, seat}: ValuesParams = {}
): SeatFormValues {
    // ⚡ Stable Reference ⚡
    const heldValues = useRef<SeatFormValues | null>(null);

    // ⚡ Access Context ⚡
    const {setInitialValues, currentValues} = useRequiredContext({
        context: SeatFormContext,
        message: "Must use within a provider for `SeatFormContext`.",
    });

    // ⚡ Default Values ⚡
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

    // ⚡ Sync Values ⚡
    useEffect(() => {
        if (!isEqual(heldValues.current, defaultValues)) {
            heldValues.current = defaultValues;
            setInitialValues(defaultValues);
        }
    }, [defaultValues, setInitialValues]);

    // ⚡ Return Values ⚡
    return currentValues ?? (heldValues.current ?? defaultValues) as SeatFormValues;
}
