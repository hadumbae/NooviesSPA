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
    roleType: z.undefined().refine(v => v, {message: "Required."}),
}).omit({job:true, characterName: true, billingOrder: true});

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
 * Discriminated union schema for movie credit form submission.
 *
 * This schema uses `roleType` as the discriminator to determine which
 * variant of the form is being submitted:
 *
 * - `EmptySchema`: Represents the initial or incomplete form state where `roleType` is `undefined`.
 * - `CrewSchema`: Represents a crew credit with a required `"CREW"` role type and a non-empty `job` field.
 * - `CastSchema`: Represents a cast credit with a required `"CAST"` role type and both `characterName` and `billingOrder` fields.
 *
 * This structure enables conditional validation in forms, allowing React Hook Form
 * or similar libraries to validate based on the selected role.
 */
export const MovieCreditSubmitSchema = z.discriminatedUnion("roleType", [EmptySchema, CrewSchema, CastSchema]);

/**
 * Inferred TypeScript type for movie credit submissions.
 *
 * This type represents all valid shapes of the movie credit form as defined
 * by the `MovieCreditSubmitSchema` discriminated union. It includes all
 * fields from the base schema and conditionally includes either crew or cast-specific fields
 * depending on the `roleType` selected by the user.
 */
export type MovieCreditSubmit = z.infer<typeof MovieCreditSubmitSchema>;