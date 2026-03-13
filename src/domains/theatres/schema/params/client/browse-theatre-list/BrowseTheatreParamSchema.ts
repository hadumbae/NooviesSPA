/**
 * @file BrowseTheatreParamSchema.ts
 *
 * Zod schemas and inferred types for theatre browse
 * query parameters and form values.
 *
 * Used by client-side browse forms and URL
 * search parameter synchronization.
 */

import {z} from "zod";
import {LocationTargetSchema} from "@/common/schema/strings/LocationTargetSchema.ts";
import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";

/**
 * Base browse parameter schema.
 *
 * Represents the URL-safe query parameters used
 * to filter theatre browse results.
 */
export const BrowseTheatreParamSchema = z.object({
    /** Location target used to filter theatres */
    target: LocationTargetSchema.optional(),
});

/**
 * Inferred query parameter type.
 */
export type BrowseTheatreParams = z.infer<
    typeof BrowseTheatreParamSchema
>;

/**
 * Form-safe schema derived from {@link BrowseTheatreParamSchema}.
 *
 * Normalizes optional fields for React Hook Form usage.
 */
export const BrowseTheatreParamFormValuesSchema =
    generateFormValueSchema(BrowseTheatreParamSchema);

/**
 * Inferred form value type.
 */
export type BrowseTheatreParamFormValues = z.infer<
    typeof BrowseTheatreParamFormValuesSchema
>;
