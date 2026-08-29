/**
 * @fileoverview Zod schema and type definitions for filtering and sorting genres on the index page.
 */

import {GenreQueryOptionSchema} from "@/domains/genres";
import {z} from "zod";
import {AnyValues} from "@/common/_types";

/** Schema for validating genre index query search options. */
export const GenreIndexQueryOptionsSchema = GenreQueryOptionSchema.pick({
    name: true,
    sortByName: true,
});

/** Inferred TypeScript data type for genre index query options. */
export type GenreIndexQueryOptions = z.infer<typeof GenreIndexQueryOptionsSchema>;

/** Permissive value type for genre index query option form state. */
export type GenreIndexQueryOptionsFormValues = AnyValues<GenreIndexQueryOptions>;