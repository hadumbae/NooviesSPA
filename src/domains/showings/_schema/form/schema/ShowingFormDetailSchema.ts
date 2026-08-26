/**
 * @fileoverview Zod validation schema for the showing details form.
 */

import {preprocessEmptyToUndefined} from "@/common/_feat/validation-preprocessors";
import {IDStringSchema, NonEmptyStringSchema} from "@/common/_schemas";
import {z} from "zod";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";

/**
 * Optional string field normalized from empty input.
 */
const citySchema = preprocessEmptyToUndefined(
    NonEmptyStringSchema
        .max(500, {message: "Must be 500 characters or less."})
        .optional()
).optional();

/**
 * Optional string field normalized from empty input.
 */
const stateSchema = preprocessEmptyToUndefined(
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
});

/**
 * Inferred TypeScript type for showing detail form values.
 */
export type ShowingFormDetails = z.infer<typeof ShowingFormDetailSchema>;