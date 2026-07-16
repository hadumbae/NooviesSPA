/**
 * @fileoverview Zod validation schema for the showing details form.
 */

import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";
import {IANATimezoneSchema} from "@/common/_schemas/time/IANATimezoneSchema.ts";

/**
 * Optional string field normalized from empty input.
 */
const citySchema = preprocessEmptyStringToUndefined(
    NonEmptyStringSchema
        .max(500, {message: "Must be 500 characters or less."})
        .optional()
).optional();

/**
 * Optional string field normalized from empty input.
 */
const stateSchema = preprocessEmptyStringToUndefined(
    NonEmptyStringSchema
        .max(500, {message: "Must be 500 characters or less."})
        .optional()
).optional();

/**
 * Zod schema for validating showing form identifiers and location context.
 */
export const ShowingFormDetailSchema = z.object({
    _id: IDStringSchema.optional().readonly(),
    movie: IDStringSchema,
    screen: IDStringSchema,
    theatre: IDStringSchema,
    theatreCity: citySchema,
    theatreState: stateSchema,
    theatreCountry: ISO3166Alpha2CountryCodeSchema.optional(),
    localTimezone: preprocessEmptyStringToUndefined(IANATimezoneSchema),
});

/**
 * Inferred TypeScript type for showing detail form values.
 */
export type ShowingFormDetails = z.infer<typeof ShowingFormDetailSchema>;