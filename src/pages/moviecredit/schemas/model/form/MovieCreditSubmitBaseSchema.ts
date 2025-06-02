import {MovieCreditBaseSchema} from "@/pages/moviecredit/schemas/model/base/MovieCreditBaseSchema.ts";
import {RefinedIDStringSchema} from "@/common/schema/strings/RefinedIDStringSchema.ts";
import {z} from "zod";
import {NulledStringSchema} from "@/common/schema/strings/NulledStringSchema.ts";

/**
 * Zod schema used for validating core data required to create or update a movie credit entry.
 *
 * @remarks
 * This schema extends {@link MovieCreditBaseSchema} with write-specific fields needed during form submission or mutation operations.
 * It ensures all necessary identifiers are validated and input-friendly for use in dynamic forms.
 *
 * The following fields are added:
 * - `movie`: a validated object ID string referring to the movie.
 * - `person`: a validated object ID string referring to the credited individual.
 * - `notes`: an optional string allowing user notes; accepts empty strings during input but coerces or strips them based on config.
 *
 * @example
 * ```ts
 * const credit = {
 *   movie: "60d21b4667d0d8992e610c85",
 *   person: "60d21b4967d0d8992e610c89",
 *   notes: "Special appearance",
 *   ... // fields from base schema
 * };
 * MovieCreditWriteSchema.parse(credit); // passes
 * ```
 */
export const MovieCreditFormBaseSchema = MovieCreditBaseSchema.extend({
    movie: RefinedIDStringSchema,
    person: RefinedIDStringSchema,
    notes: NulledStringSchema,
});

/**
 * Inferred TypeScript type from {@link MovieCreditFormBaseSchema}.
 *
 * Represents the base structure of a movie credit form input.
 */
export type MovieCreditFormBaseValues = z.infer<typeof MovieCreditFormBaseSchema>;