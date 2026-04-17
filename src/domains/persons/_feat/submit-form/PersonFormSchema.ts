/**
 * @fileoverview Schema definitions for Person form validation and data transformation.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {NonFutureDateStringSchema} from "@/common/schema/dates/NonFutureDateStringSchema.ts";
import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Core validation schema for Person data.
 */
export const PersonFormSchema = z.object({
    _id: IDStringSchema.optional(),
    name: NonEmptyStringSchema.max(255, "Name must not be more than 255 characters."),
    biography: NonEmptyStringSchema.max(1000, "Must be 1000 characters or less."),
    dob: NonFutureDateStringSchema,
    nationality: ISO3166Alpha2CountryCodeEnum,
});

/**
 * Schema for raw form values, allowing for initial empty or unrefined input.
 */
export const PersonFormValuesSchema = generateFormValueSchema(PersonFormSchema);

/**
 * Resolver schema that pipes raw form values into the refined PersonFormSchema.
 */
export const PersonFormResolverSchema = PersonFormValuesSchema.pipe(PersonFormSchema);

/**
 * Inferred type for raw input values (e.g., strings from HTML inputs).
 */
export type PersonFormValues = z.infer<typeof PersonFormValuesSchema>;

/**
 * Inferred type for validated and refined submission data.
 */
export type PersonFormData = z.infer<typeof PersonFormSchema>;