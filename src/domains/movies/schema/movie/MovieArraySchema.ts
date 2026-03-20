/**
 * @file Validation schema for a collection of basic Movie records.
 * @filename MovieArraySchema.ts
 */

import {z} from "zod";
import {MovieSchema} from "@/domains/movies/schema/movie/MovieSchema.ts";

/**
 * Zod schema for an array of {@link MovieSchema} objects.
 * * * **Usage:** Use this to validate bulk data operations or list-based API responses
 * where genres are provided as raw ObjectIDs.
 */
export const MovieArraySchema = z.array(MovieSchema);

/**
 * TypeScript type inferred from {@link MovieArraySchema}.
 * * Represents a collection of {@link Movie} objects.
 */
export type MovieArray = z.infer<typeof MovieArraySchema>;