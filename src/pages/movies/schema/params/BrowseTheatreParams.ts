/**
 * @file BrowseTheatreParams.schema.ts
 *
 * Zod schemas and inferred types for browsing theatres via location-based filters.
 *
 * Used by:
 * - Browse / listing queries
 * - Filter forms (via form-safe value transformation)
 *
 * Scope:
 * - Restricts the full theatre query filter to public-facing browse parameters
 */

import {TheatreQueryFilterSchema} from "@/pages/theatres/schema/queries/TheatreQueryOption.schema.ts";
import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {z} from "zod";

/**
 * Zod schema defining the allowed browse parameters for theatres.
 *
 * Subset of `TheatreQueryFilterSchema`, limited to geographic filters.
 */
export const BrowseTheatreParamsSchema = TheatreQueryFilterSchema.pick({
    city: true,
    state: true,
    country: true,
    postalCode: true,
});

/**
 * Runtime-safe, inferred type for validated browse theatre parameters.
 */
export type BrowseTheatreParams = z.infer<typeof BrowseTheatreParamsSchema>;

/**
 * Form-compatible schema for browse theatre parameters.
 *
 * Transforms the base schema into values suitable for uncontrolled / optional form inputs.
 */
export const BrowseTheatreParamFormValueSchema =
    generateFormValueSchema(BrowseTheatreParamsSchema);

/**
 * Inferred type representing form-safe browse theatre parameter values.
 */
export type BrowseTheatreParamFormValues =
    z.infer<typeof BrowseTheatreParamFormValueSchema>;
