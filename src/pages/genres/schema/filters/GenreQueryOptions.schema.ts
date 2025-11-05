/**
 * @fileoverview Zod schemas for validating genre query parameters.
 * These schemas define the shape and validation rules for both filtering
 * and sorting options used in genre-related queries.
 */

import { z } from "zod";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { MongooseSortOrderSchema } from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";

/**
 * Schema representing valid filter parameters for a genre query.
 *
 * - `name`: Optional non-empty string between 3–255 characters.
 */
export const GenreQueryFilterSchema = z.object({
    name: NonEmptyStringSchema
        .min(3, "Must be 3 characters or longer.")
        .max(255, "Must be 255 characters or less.")
        .optional(),
});

/**
 * Schema representing sorting options for a genre query.
 *
 * - `sortByName`: Accepts a sort order (`asc` or `desc`), or `undefined`
 *   when the sort parameter is empty.
 */
export const GenreQuerySortSchema = z.object({
    sortByName: preprocessEmptyStringToUndefined(MongooseSortOrderSchema.optional()),
});

/**
 * Combined schema including both filter and sorting options
 * for genre queries. Useful for endpoints or service-layer validation.
 */
export const GenreQueryOptionSchema = GenreQueryFilterSchema.merge(GenreQuerySortSchema);