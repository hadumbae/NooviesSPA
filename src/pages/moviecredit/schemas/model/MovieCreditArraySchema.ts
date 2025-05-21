import {z} from "zod";
import {MovieCreditSchema} from "@/pages/moviecredit/schemas/model/base/MovieCreditSchema.ts";

/**
 * Zod schema for validating an array of movie credit objects.
 *
 * Ensures that the input is an array where each element conforms to the {@link MovieCreditSchema}.
 * Provides a custom error message if the input is not a valid array.
 */
export const MovieCreditArraySchema = z.array(MovieCreditSchema, {message: "Must be an array of movie credits."});

/**
 * TypeScript type inferred from {@link MovieCreditArraySchema}.
 *
 * Represents a validated array of movie credit entries.
 */
export type MovieCreditArray = z.infer<typeof MovieCreditArraySchema>;