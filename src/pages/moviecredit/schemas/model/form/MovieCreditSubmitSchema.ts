import {MovieCreditBaseSchema} from "@/pages/moviecredit/schemas/model/base/MovieCreditBaseSchema.ts";
import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/PositiveNumberSchema.ts";
import unionWithEmptyString from "@/common/utility/schemas/unionWithEmptyString.ts";
import {RefinedIDStringSchema} from "@/common/schema/strings/RefinedIDStringSchema.ts";

const MovieCreditWriteSchema = MovieCreditBaseSchema.extend({
    movie: RefinedIDStringSchema,
    person: RefinedIDStringSchema,
    notes: unionWithEmptyString({schema: NonEmptyStringSchema.optional()}),
});

const EmptySchema = MovieCreditWriteSchema.extend({
    roleType: z.literal(""),
}).omit({job: true, characterName: true, billingOrder: true});

const CrewSchema = MovieCreditWriteSchema.extend({
    roleType: z.literal("CREW"),
    job: unionWithEmptyString({schema: NonEmptyStringSchema, disallowEmptyString: true}),
}).omit({characterName: true, billingOrder: true});

const CastSchema = MovieCreditWriteSchema.extend({
    roleType: z.literal("CAST"),
    characterName: unionWithEmptyString({schema: NonEmptyStringSchema, disallowEmptyString: true}),
    billingOrder: unionWithEmptyString({schema: PositiveNumberSchema, disallowEmptyString: true}),
}).omit({job: true});

/**
 * A Zod schema that defines form-level validation for a movie credit input,
 * using a discriminated union on the `roleType` field.
 *
 * - `roleType` can be "CAST", "CREW", or an empty string.
 * - Enforces field presence and types based on the role type:
 *   - "CAST" requires `characterName` and `billingOrder`.
 *   - "CREW" requires `job`.
 *   - Empty role omits both.
 *
 * Uses `MovieCreditBaseSchema` as a foundation and extends with specific fields.
 */
export const MovieCreditFormSchema = z.discriminatedUnion("roleType", [EmptySchema, CrewSchema, CastSchema]);

/**
 * Type representing the form input values derived from `MovieCreditFormSchema`.
 *
 * Used for working with validated movie credit data on the frontend.
 */
export type MovieCreditFormValues = z.infer<typeof MovieCreditFormSchema>;

/**
 * A stricter version of `MovieCreditFormSchema` for submission,
 * refining the schema to disallow empty `roleType` values.
 *
 * Ensures the user has explicitly selected a role before submitting the form.
 */
export const MovieCreditSubmitSchema = MovieCreditFormSchema.refine(
    data => data.roleType !== "",
    {path: ['roleType'], message: "Required."},
);

/**
 * Type representing the validated, ready-to-submit movie credit data.
 *
 * Used after form-level validation and refinement for actual submission logic.
 */
export type MovieCreditSubmit = z.infer<typeof MovieCreditSubmitSchema>;