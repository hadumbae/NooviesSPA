/**
 * @fileoverview Collection-level schemas for movie credit entities.
 * Provides array validation and type definitions for lists of credits.
 */

import {z} from "zod";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {MovieCreditSchema} from "@/domains/moviecredit/schemas";

/**
 * Validates an array of movie credit objects.
 */
export const MovieCreditArraySchema = generateArraySchema(MovieCreditSchema);

/**
 * Represents a validated array of movie credits.
 */
export type MovieCreditArray = z.infer<typeof MovieCreditArraySchema>;