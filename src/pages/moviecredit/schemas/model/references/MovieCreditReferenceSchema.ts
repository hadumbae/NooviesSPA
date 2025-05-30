import {MovieCreditBaseSchema} from "@/pages/moviecredit/schemas/model/base/MovieCreditBaseSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {z, ZodType} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/PositiveNumberSchema.ts";
import {IReferenceMovieCredit} from "@/pages/moviecredit/interfaces/IReferenceMovieCredit.ts";

const MovieCreditReadSchema = MovieCreditBaseSchema.extend({
    _id: IDStringSchema.readonly(),
    movie: IDStringSchema,
    person: IDStringSchema,
});

const CrewSchema = MovieCreditReadSchema.extend({
    roleType: z.literal("CREW"),
    job: NonEmptyStringSchema,
}).omit({characterName: true, billingOrder: true});

const CastSchema = MovieCreditReadSchema.extend({
    roleType: z.literal("CAST"),
    characterName: NonEmptyStringSchema,
    billingOrder: PositiveNumberSchema,
}).omit({job: true});

/**
 * Zod schema representing a movie credit entry with referenced IDs for movie and person.
 *
 * @remarks
 * This schema uses a discriminated union on the `roleType` field to distinguish between
 * crew and cast roles. The `movie` and `person` fields are simple ID strings instead of
 * populated objects.
 *
 * Cast entries include `characterName` and `billingOrder`, while crew entries include a `job`.
 * Fields not relevant to the role type are omitted using `.omit()`.
 */
export const MovieCreditReferenceSchema: ZodType<IReferenceMovieCredit> = z.discriminatedUnion("roleType", [CrewSchema, CastSchema]);

/**
 * Inferred TypeScript type from {@link MovieCreditReferenceSchema}.
 *
 * @remarks
 * Represents a type-safe version of a movie credit record containing only references
 * (IDs) for linked entities. Use this when working with raw references without populating data.
 */
export type MovieCreditReference = z.infer<typeof MovieCreditReferenceSchema>;