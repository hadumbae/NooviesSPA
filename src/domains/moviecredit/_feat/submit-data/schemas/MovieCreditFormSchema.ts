/**
 * @fileoverview Zod schema and type definitions for the movie credit form discriminated union.
 */

import {z} from "zod";
import {MovieCreditFormCrewSchema} from "@/domains/moviecredit/_feat/submit-data/schemas/MovieCreditFormCrewSchema.ts";
import {MovieCreditFormCastSchema} from "@/domains/moviecredit/_feat/submit-data/schemas/MovieCreditFormCastSchema.ts";
import {AnyValues} from "@/common/types";

/** Discriminated union schema for validating movie credits as either cast or crew. */
export const MovieCreditFormSchema = z.discriminatedUnion("department", [
    MovieCreditFormCrewSchema,
    MovieCreditFormCastSchema,
]);

/** Type representing a movie credit form inferred from the schema. */
export type MovieCreditFormData = z.infer<typeof MovieCreditFormSchema>;

/** Shape of movie credit data as captured by form inputs before transformation. */
export type MovieCreditFormValues = AnyValues<MovieCreditFormData>;