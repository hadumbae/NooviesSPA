/**
 * @fileoverview Type definitions for the showing submission form hook.
 */

import {IANATimezone} from "@/common/schema/date-time/IANATimezone.schema.ts";
import {Showing} from "@/domains/showings/schema/showing/ShowingSchema.ts";

import {ShowingFormValues} from "@/domains/showings/schema/form";

/** Parameters for initializing the form in edit mode with existing data and timezone context. */
export type ShowingEditConfig = | {
    showing: Showing;
    theatreTimezone: IANATimezone;
} | {
    showing?: never;
    theatreTimezone?: never;
};

/** Configuration object for the showing form hook supporting both creation and editing flows. */
export type ShowingFormValuesConfig = ShowingEditConfig & {
    /** Optional preset form values used during initialization */
    presetValues?: Partial<ShowingFormValues>;
};
