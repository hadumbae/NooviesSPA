/**
 * @fileoverview Reference-level filters for MovieCredit queries.
 * Defines schemas for filtering credits based on properties of related entities
 * (Movies and RoleTypes) rather than direct fields on the credit document.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * Reference-level filters for MovieCredit queries.
 */
export const MovieCreditQueryReferenceFiltersSchema = z.object({
    movieSlug: NonEmptyStringSchema.optional(),
    roleName: NonEmptyStringSchema.optional(),
});

/**
 * Validated reference-level filter parameters.
 */
export type MovieCreditQueryReferenceFilters =
    z.infer<typeof MovieCreditQueryReferenceFiltersSchema>;