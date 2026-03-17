import {IANATimezone} from "@/common/schema/date-time/IANATimezone.schema.ts";
import {Showing} from "@/domains/showings/schema/showing/ShowingSchema.ts";
import {ShowingFormValues} from "@/domains/showings/schema/form/form-values-schemas/ShowingFormValuesSchema.ts";

/**
 * Editing-specific parameters for showing form initialization.
 *
 * When provided, the form operates in edit mode and uses the
 * existing showing data together with the theatre timezone.
 */
export type UseShowingFormEditingValues = | {
    showing: Showing;
    theatreTimezone: IANATimezone;
} | {
    showing?: never;
    theatreTimezone?: never;
};

/**
 * Parameters for initializing the showing form.
 *
 * Supports both create and edit flows, with optional preset values
 * applied during form initialization.
 */
export type UseShowingFormParams = UseShowingFormEditingValues & {
    /** Optional preset form values used during initialization */
    presetValues?: Partial<ShowingFormValues>;
};
