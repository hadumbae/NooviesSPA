/**
 * @file useShowingSubmitForm.ts
 * @description
 * Custom hook for initializing a `react-hook-form` instance for creating or editing a Showing.
 *
 * Features:
 * - Integrates `zodResolver` with {@link ShowingFormSchema} for validation.
 * - Computes `defaultValues` dynamically from:
 *   1. `presetValues` (highest priority)
 *   2. `showing` (existing entity data)
 *   3. Hardcoded empty/default values
 * - Converts UTC showing times to the theatre’s local timezone when editing, using {@link getShowingDateAndTime}.
 * - Returns a fully typed `UseFormReturn<ShowingFormValues>` for use with React Hook Form.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ShowingFormSchema} from "@/pages/showings/schema/form/ShowingForm.schema.ts";
import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";
import {IANATimezone} from "@/common/schema/date-time/IANATimezone.schema.ts";
import getShowingDateAndTime from "@/common/utility/date-and-time/getShowingDateAndTime.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";
import {ShowingFormValues} from "@/pages/showings/schema/form/ShowingFormValues.types.ts";

/**
 * Parameters for {@link useShowingSubmitForm} when editing an existing showing.
 */
type EditingParams =
    | {
    /** The showing being edited. */
    showing: Showing;

    /** Theatre’s IANA timezone for localizing showtime fields. */
    theatreTimezone: IANATimezone;
}
    | {
    /** Not provided when creating a new showing. */
    showing?: never;

    /** Not provided when creating a new showing. */
    theatreTimezone?: never;
};

/**
 * Parameters accepted by {@link useShowingSubmitForm}.
 */
type SubmitFormParams = EditingParams & {
    /**
     * Optional preset values to prefill specific form fields before defaulting
     * to `showing` data or hardcoded empty defaults.
     */
    presetValues?: Partial<ShowingFormValues>;
};

/**
 * Initializes a `react-hook-form` instance for the Showing form.
 *
 * @description
 * Returns a fully configured form instance with validation and default values.
 * This hook handles both **creating a new showing** and **editing an existing showing**.
 *
 * @param {SubmitFormParams} [params] - Optional parameters for form initialization.
 * @param {Showing} [params.showing] - Existing showing to prefill the form (editing mode).
 * @param {IANATimezone} [params.theatreTimezone] - Theatre timezone for converting UTC times.
 * @param {Partial<ShowingFormValues>} [params.presetValues] - Optional preset field values.
 *
 * @returns {UseFormReturn<ShowingFormValues>} A `react-hook-form` instance with:
 * - `resolver`: zodResolver configured with {@link ShowingFormSchema}.
 * - `defaultValues`: computed defaults from `presetValues`, `showing`, or empty values.
 *
 * @example
 * ```ts
 * const form = useShowingSubmitForm({
 *   showing: existingShowing,
 *   theatreTimezone: "Asia/Bangkok",
 *   presetValues: { language: "en" },
 * });
 *
 * <form onSubmit={form.handleSubmit(onSubmit)}>
 *   <input {...form.register("startAtDate")} />
 *   <input {...form.register("startAtTime")} />
 * </form>
 * ```
 */
export default function useShowingSubmitForm(
    params: SubmitFormParams = {}
): UseFormReturn<ShowingFormValues> {
    const {showing, theatreTimezone, presetValues} = params;

    const formattedDateAndTime = showing
        ? getShowingDateAndTime({
            startTime: showing.startTime,
            endTime: showing.endTime,
            theatreTimezone,
        })
        : null;

    const defaultValues: ShowingFormValues = {
        startAtTime: getDefaultValue(presetValues?.startAtTime, formattedDateAndTime?.startAtTime, ""),
        startAtDate: getDefaultValue(presetValues?.startAtDate, formattedDateAndTime?.startAtDate, ""),
        endAtTime: getDefaultValue(presetValues?.endAtTime, formattedDateAndTime?.endAtTime, ""),
        endAtDate: getDefaultValue(presetValues?.endAtDate, formattedDateAndTime?.endAtDate, ""),
        ticketPrice: getDefaultValue(presetValues?.ticketPrice, showing?.ticketPrice, ""),
        language: getDefaultValue(presetValues?.language, showing?.language, ""),
        subtitleLanguages: getDefaultValue(presetValues?.subtitleLanguages, showing?.subtitleLanguages, []),
        isSpecialEvent: getDefaultValue(presetValues?.isSpecialEvent, showing?.isSpecialEvent, ""),
        isActive: getDefaultValue(presetValues?.isActive, showing?.isActive, ""),
        movie: getDefaultValue(presetValues?.movie, showing?.movie, ""),
        theatre: getDefaultValue(presetValues?.theatre, showing?.theatre, ""),
        screen: getDefaultValue(presetValues?.screen, showing?.screen, ""),
        status: getDefaultValue(presetValues?.status, showing?.status, "SCHEDULED"),
        theatreCity: presetValues?.theatreCity ?? "",
        theatreState: presetValues?.theatreState ?? "",
        theatreCountry: presetValues?.theatreCountry ?? undefined,
    };

    return useForm<ShowingFormValues>({
        resolver: zodResolver(ShowingFormSchema),
        defaultValues,
    });
}
