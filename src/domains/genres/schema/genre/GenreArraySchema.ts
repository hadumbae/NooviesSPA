/**
 * @fileoverview Schema and type definitions for collections of Genre entities.
 * Defines the validation logic for non-paginated arrays of genre data.
 */

import {z} from "zod";
import {GenreSchema} from "@/domains/genres/schema/genre/GenreSchema.ts";

/**
 * Validation schema for a standard array of genre objects.
 */
export const GenreArraySchema = z.array(GenreSchema);

/**
 * TypeScript type inferred from {@link GenreArraySchema}.
 */
export type GenreArray = z.infer<typeof GenreArraySchema>;