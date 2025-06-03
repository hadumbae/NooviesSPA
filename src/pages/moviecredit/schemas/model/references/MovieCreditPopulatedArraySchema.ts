import generateArraySchema from "@/common/utility/validation/generateArraySchema.ts";
import {MovieCreditPopulatedSchema} from "@/pages/moviecredit/schemas/model/references/MovieCreditPopulatedSchema.ts";
import {z} from "zod";

/**
 * Zod schema for validating an array of populated movie credit objects.
 *
 * This schema is built using `generateArraySchema` to ensure consistent error
 * messaging and array structure, where each item must conform to
 * `MovieCreditPopulatedSchema`.
 *
 * Used to validate API responses or form data involving multiple movie credits
 * with populated references (e.g. people or movies).
 */
export const MovieCreditPopulatedArraySchema = generateArraySchema(MovieCreditPopulatedSchema);

/**
 * TypeScript type representing the parsed result of a validated
 * array of populated movie credits.
 *
 * Equivalent to: `MovieCreditPopulated[]`
 */
export type PopulatedMovieCreditArray = z.infer<typeof MovieCreditPopulatedArraySchema>;