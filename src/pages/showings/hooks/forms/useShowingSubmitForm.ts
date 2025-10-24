import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ShowingFormSchema} from "@/pages/showings/schema/form/ShowingForm.schema.ts";
import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";
import {ShowingFormValues} from "@/pages/showings/schema/form/ShowingForm.types.ts";
import {IANATimezone} from "@/common/schema/datetime/IANATimezone.schema.ts";
import getShowingDateAndTime from "@/common/utility/date-and-time/getShowingDateAndTime.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";

/**
 * Parameters for {@link useShowingSubmitForm} when editing an existing showing.
 */
type EditingParams =
    | {
    /** The showing being edited. */
    showing: Showing;

    /** The theatre’s IANA timezone used to localize showtime fields. */
    theatreTimezone: IANATimezone;
} | {
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
     * Optional preset values used to prefill specific fields
     * before defaulting to `showing` data or empty strings.
     */
    presetValues?: Partial<ShowingFormValues>;
};

/**
 * Initializes a `react-hook-form` instance for creating or editing a showing.
 *
 * @description
 * This hook prepares a form with schema-based validation using
 * {@link ShowingFormSchema}, and dynamically determines default values from:
 *
 * 1. `presetValues` (highest priority)
 * 2. `showing` (existing entity data)
 * 3. Hardcoded empty defaults
 *
 * When editing, it converts UTC showing times to the theatre’s local timezone
 * using {@link getShowingDateAndTime}.
 *
 * @param {SubmitFormParams} [params] - Optional configuration for the form.
 * @param {Showing} [params.showing] - Existing showing being edited.
 * @param {IANATimezone} [params.theatreTimezone] - Theatre’s timezone.
 * @param {Partial<ShowingFormValues>} [params.presetValues] - Optional preset field values.
 *
 * @returns {ReturnType<typeof useForm>} A `react-hook-form` instance configured with:
 * - `resolver` — the `zodResolver` for `ShowingFormSchema`
 * - `defaultValues` — field values computed from provided data
 *
 * @example
 * ```ts
 * import useShowingSubmitForm from "@/pages/showings/hooks/forms/useShowingSubmitForm.ts";
 *
 * const form = useShowingSubmitForm({
 *   showing: existingShowing,
 *   theatreTimezone: "Asia/Bangkok",
 *   presetValues: { language: "English" },
 * });
 *
 * // Usage:
 * <form onSubmit={form.handleSubmit(onSubmit)}>
 *   <input {...form.register("startAtDate")} />
 *   <input {...form.register("startAtTime")} />
 *   ...
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
            theatreTimezone: theatreTimezone,
        }) : null;

    const defaultValues: ShowingFormValues = {
        startAtTime: getDefaultValue(presetValues?.startAtTime, formattedDateAndTime?.startAtTime, ""),
        startAtDate: getDefaultValue(presetValues?.startAtDate, formattedDateAndTime?.startAtDate, ""),
        endAtTime: getDefaultValue(presetValues?.endAtTime, formattedDateAndTime?.endAtTime, ""),
        endAtDate: getDefaultValue(presetValues?.endAtDate, formattedDateAndTime?.endAtDate, ""),
        ticketPrice: getDefaultValue(presetValues?.ticketPrice, showing?.ticketPrice, ""),
        language: getDefaultValue(presetValues?.language, showing?.language, ""),
        subtitleLanguages: getDefaultValue(presetValues?.subtitleLanguages, showing?.subtitleLanguages, ""),
        isSpecialEvent: getDefaultValue(presetValues?.isSpecialEvent, showing?.isSpecialEvent, ""),
        isActive: getDefaultValue(presetValues?.isActive, showing?.isActive, ""),
        movie: getDefaultValue(presetValues?.movie, showing?.movie, ""),
        theatre: getDefaultValue(presetValues?.theatre, showing?.theatre, ""),
        screen: getDefaultValue(presetValues?.screen, showing?.screen, ""),
        status: getDefaultValue(presetValues?.status, showing?.status, "SCHEDULED"),
    };

    return useForm<ShowingFormValues>({
        resolver: zodResolver(ShowingFormSchema),
        defaultValues,
    });
}
