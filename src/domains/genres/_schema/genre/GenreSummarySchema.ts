/**
 * @fileoverview Zod schema and type definitions for genre summary projections.
 */

import {GenreSchema} from "@/domains/genres/_schema/genre/GenreSchema.ts";
import {z} from "zod";

/** Zod schema for validating genre summary attributes. */
export const GenreSummarySchema = GenreSchema.pick({
    _id: true,
    name: true,
    description: true,
    slug: true,
});

/** Inferred type for a validated genre summary document. */
export type GenreSummary = z.infer<typeof GenreSummarySchema>;