import { z } from "zod";
import {
    MovieCreditDetailsExceptPersonSchema,
    MovieCreditDetailsSchema,
    MovieCreditSchema,
} from "@/pages/moviecredit/schemas/model/MovieCredit.schema.ts";

/**
 * Type representing a movie credit (cast or crew).
 *
 * @remarks
 * - Inferred from {@link MovieCreditSchema}.
 * - Includes both cast-specific and crew-specific fields.
 * - Use for validating or typing raw movie credit objects from the database or API.
 */
export type MovieCredit = z.infer<typeof MovieCreditSchema>;

/**
 * Type representing a movie credit with fully populated details.
 *
 * @remarks
 * - Inferred from {@link MovieCreditDetailsSchema}.
 * - `movie`, `person`, and `roleType` fields are full objects, not just IDs.
 * - Useful when returning enriched API responses or performing operations requiring full related objects.
 */
export type MovieCreditDetails = z.infer<typeof MovieCreditDetailsSchema>;

/**
 * Type representing a movie credit with populated `movie` and `roleType`, but `person` as ID only.
 *
 * @remarks
 * - Inferred from {@link MovieCreditDetailsExceptPersonSchema}.
 * - Useful when you want most related details but want to avoid embedding full person objects.
 */
export type MovieCreditDetailsExceptPerson = z.infer<typeof MovieCreditDetailsExceptPersonSchema>;
