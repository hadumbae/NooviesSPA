/**
 * @fileoverview Schemas for genre query form values.
 * Defines filter, sort, and combined option schemas for genre queries.
 */

import { z } from "zod";
import { FormStarterValueSchema } from "@/common/schema/form/FormStarterValueSchema.ts";

/**
 * Schema representing filter form values for a genre query.
 * Currently supports filtering by `name`.
 */
export const GenreQueryFilterFormValueSchema = z.object({
    name: FormStarterValueSchema,
});

/**
 * Schema representing sorting options for a genre query.
 * Currently supports sorting by genre `name`.
 */
export const GenreQuerySortFormValueSchema = z.object({
    sortByName: FormStarterValueSchema,
});

/**
 * Combined schema including both filter and sorting options
 * for a genre query form.
 */
export const GenreQueryOptionFormValueSchema =
    GenreQueryFilterFormValueSchema.merge(GenreQuerySortFormValueSchema);