import {MovieCreditFormBaseSchema} from "@/pages/moviecredit/schemas/model/form/MovieCreditSubmitBaseSchema.ts";
import {z} from "zod";
import unionWithEmptyString from "@/common/utility/schemas/unionWithEmptyString.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/PositiveNumberSchema.ts";

/**
 * Zod schema for validating form values when submitting a cast (actor/actress) role in a movie credit form.
 *
 * @remarks
 * This schema is built on top of `MovieCreditWriteSchema`, extending it with:
 * - `roleType` fixed to `"CAST"`
 * - `characterName`: required non-empty string (but allows temporary empty string during input)
 * - `billingOrder`: required positive number (also temporarily allows empty string during input)
 *
 * The `job` field, which is only relevant for crew roles, is explicitly omitted.
 *
 * This schema improves form UX by enabling empty string handling during user input, while enforcing strict validation before submission.
 *
 * @example
 * ```ts
 * const validCast = {
 *   roleType: "CAST",
 *   characterName: "John Wick",
 *   billingOrder: 1,
 *   ... // other base fields
 * };
 * MovieCreditFormCastSchema.parse(validCast); // passes
 * ```
 */
export const MovieCreditFormCastSchema = MovieCreditFormBaseSchema.extend({
    roleType: z.literal("CAST"),
    characterName: unionWithEmptyString({schema: NonEmptyStringSchema, disallowEmptyString: true}),
    billingOrder: unionWithEmptyString({schema: PositiveNumberSchema, disallowEmptyString: true}),
}).omit({job: true});


/**
 * Inferred TypeScript type for the cast role form values, based on {@link MovieCreditFormCastSchema}.
 */
export type MovieCreditFormCastValues = z.infer<typeof MovieCreditFormCastSchema>;