import {MovieCreditBaseSchema} from "@/pages/moviecredit/schemas/model/base/MovieCreditBaseSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {z, ZodType} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/PositiveNumberSchema.ts";
import {IMovieCredit} from "@/pages/moviecredit/interfaces/IMovieCredit.ts";
import {MovieSchema} from "@/pages/movies/schema/model/MovieSchema.ts";
import {PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";

const MovieCreditReadSchema = MovieCreditBaseSchema.extend({
    _id: IDStringSchema.readonly(),
    movie: z.union([IDStringSchema, z.lazy(() => MovieSchema)]),
    person: z.union([IDStringSchema, z.lazy(() => PersonSchema)]),
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
 * Schema representing a movie credit, discriminated by the `roleType` field.
 *
 * @remarks
 * This schema is a discriminated union of two variants:
 * - **Crew**: Represents a crew member with a `roleType` of `"CREW"` and includes a `job` field.
 * - **Cast**: Represents a cast member with a `roleType` of `"CAST"` and includes `characterName` and `billingOrder` fields.
 *
 * The schema extends `MovieCreditBaseSchema` by adding identifiers for the movie and person, as well as a read-only `_id` field.
 */
export const MovieCreditSchema: ZodType<IMovieCredit> = z.discriminatedUnion("roleType", [CrewSchema, CastSchema]);


/**
 * TypeScript type inferred from {@link MovieCreditSchema}.
 *
 * @remarks
 * This type represents a movie credit, which can be either a crew or cast member, as defined by the discriminated union in `MovieCreditSchema`.
 */
export type MovieCredit = z.infer<typeof MovieCreditSchema>;