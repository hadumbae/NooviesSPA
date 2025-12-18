import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";
import {IANATimezone} from "@/common/schema/date-time/IANATimezone.schema.ts";
import {ShowingFormValues} from "@/pages/showings/schema/form/ShowingFormValues.types.ts";

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
