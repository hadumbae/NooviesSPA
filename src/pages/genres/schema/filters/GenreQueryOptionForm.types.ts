/**
 * @fileoverview Type definitions inferred from Genre query form schemas.
 * These types are derived directly from Zod schemas to ensure consistency
 * between runtime validation and compile-time TypeScript types.
 */

import { z } from "zod";
import {
    GenreQueryFilterFormValueSchema,
    GenreQuerySortFormValueSchema,
    GenreQueryOptionFormValueSchema,
} from "@/pages/genres/schema/filters/GenreQueryOptionForm.schema.ts";

/**
 * Type representing filter form values for a genre query.
 * Derived from {@link GenreQueryFilterFormValueSchema}.
 */
export type GenreQueryFilterFormValues = z.infer<typeof GenreQueryFilterFormValueSchema>;

/**
 * Type representing sort form values for a genre query.
 * Derived from {@link GenreQuerySortFormValueSchema}.
 */
export type GenreQuerySortFormValues = z.infer<typeof GenreQuerySortFormValueSchema>;

/**
 * Combined type including both filter and sorting form values
 * for a genre query.
 * Derived from {@link GenreQueryOptionFormValueSchema}.
 */
export type GenreQueryOptionFormValues = z.infer<typeof GenreQueryOptionFormValueSchema>;
