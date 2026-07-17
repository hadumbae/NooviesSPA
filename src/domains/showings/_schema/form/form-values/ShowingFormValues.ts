/**
 * @fileoverview Defines the TypeScript types for showing form values derived from Zod schemas.
 */

import {AnyValues} from "@/common/_types";
import {ShowingFormData} from "@/domains/showings/_schema/form/schema/ShowingFormSchema.ts";
import {ShowingFormStatuses} from "@/domains/showings/_schema/form/schema/ShowingFormStatusSchema.ts";
import {ShowingFormLanguages} from "@/domains/showings/_schema/form/schema/ShowingFormLanguageSchema.ts";
import {ShowingFormDetails} from "@/domains/showings/_schema/form/schema/ShowingFormDetailSchema.ts";
import {ShowingFormDateTimes} from "@/domains/showings/_schema/form/schema/ShowingFormDateTimeSchema.ts";

/** Values for the showing status form section. */
export type ShowingFormStatusValues = AnyValues<ShowingFormStatuses>;

/** Values for the showing language form section. */
export type ShowingFormLanguageValues = AnyValues<ShowingFormLanguages>

/** Values for the showing details form section. */
export type ShowingFormDetailValues = AnyValues<ShowingFormDetails>

/** Values for the showing date and time form section. */
export type ShowingFormDateTimeValues = AnyValues<ShowingFormDateTimes>;

/** Composite values for the entire showing form including theatre location metadata. */
export type ShowingFormValues = AnyValues<ShowingFormData> & {
    theatreCity: any;
    theatreState: any;
    theatreCountry: any;
};