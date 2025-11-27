/**
 * # useSeatMapSubmitForm Hook
 *
 * Custom React Hook for initializing and managing a seat map submission form
 * using `react-hook-form` with Zod validation.
 *
 * Provides:
 * - Type-safe form values based on `SeatMapFormSchema`.
 * - Automatic default value population from an existing `SeatMap` or
 *   optional preset values.
 * - Integration with `zodResolver` for form validation.
 *
 * ## Features
 * - Default values are intelligently determined from:
 *   - `presetValues` — user-provided overrides.
 *   - `seatMap` — existing entity data.
 *   - Fallback defaults when neither is provided.
 * - Full type inference for form methods (`UseFormReturn<SeatMapFormValues>`).
 */

import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";
import {SeatMap} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import {SeatMapFormValues} from "@/pages/seatmap/schema/form/SeatMapForm.types.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SeatMapFormSchema} from "@/pages/seatmap/schema/form/SeatMapForm.schema.ts";

/**
 * ## FormParams
 *
 * Parameters for initializing the `useSeatMapSubmitForm` hook.
 *
 * - **seatMap?** — Optional existing seat map object to prefill the form.
 * - **presetValues?** — Optional partial values to override defaults or existing seat map values.
 *
 * @example
 * const params: FormParams = {
 *   seatMap: existingSeatMap,
 *   presetValues: { price: 150 }
 * };
 */
type FormParams = {
    seatMap?: SeatMap;
    presetValues?: Partial<SeatMapFormValues>;
};

/**
 * ## useSeatMapSubmitForm
 *
 * Hook to initialize and manage the seat map form state with validation.
 *
 * @param params - Configuration including optional existing seat map and preset values.
 *
 * @returns A `UseFormReturn<SeatMapFormValues>` object containing:
 * - `register` — function to register form inputs
 * - `handleSubmit` — function to handle form submission
 * - `watch` — form state watcher
 * - `setValue` / `getValues` — helpers to manipulate form values
 * - `formState` — form validation and submission state
 *
 * @example
 * const { register, handleSubmit, formState } = useSeatMapSubmitForm({
 *   seatMap: existingSeatMap,
 *   presetValues: { price: 200 }
 * });
 */
export default function useSeatMapSubmitForm(params: FormParams): UseFormReturn<SeatMapFormValues> {
    const {seatMap, presetValues} = params;

    const defaultValues = {
        seat: getDefaultValue(presetValues?.seat, seatMap?.seat, undefined),
        showing: getDefaultValue(presetValues?.showing, seatMap?.showing, undefined),
        price: getDefaultValue(presetValues?.price, seatMap?.price, ""),
        status: getDefaultValue(presetValues?.status, seatMap?.status, undefined),
    };

    return useForm<SeatMapFormValues>({
        resolver: zodResolver(SeatMapFormSchema),
        defaultValues,
    });
}
