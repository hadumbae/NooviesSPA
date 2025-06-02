import {MovieCreditBaseSchema} from "@/pages/moviecredit/schemas/model/base/MovieCreditBaseSchema.ts";
import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/PositiveNumberSchema.ts";
import {MovieSchema} from "@/pages/movies/schema/model/MovieSchema.ts";
import {PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";

const MovieCreditObjectSchema = MovieCreditBaseSchema.extend({
    _id: IDStringSchema.readonly(),
    movie: z.lazy(() => MovieSchema, {message: "Invalid Movie Type."}),
    person: z.lazy(() => PersonSchema, {message: "Invalid Person Type."}),
});

const CrewSchema = MovieCreditObjectSchema.extend({
    roleType: z.literal("CREW"),
    job: NonEmptyStringSchema,
}).omit({characterName: true, billingOrder: true});

const CastSchema = MovieCreditObjectSchema.extend({
    roleType: z.literal("CAST"),
    characterName: NonEmptyStringSchema,
    billingOrder: PositiveNumberSchema,
}).omit({job: true});

/**
 * Schema representing a fully populated movie credit, either as cast or crew.
 *
 * This version of the credit schema assumes the `movie` and `person` fields are populated
 * with full objects (`MovieSchema` and `PersonSchema`, respectively), rather than IDs.
 *
 * @remarks
 * This schema is a discriminated union of two variants:
 * - **Crew**: Represents a crew member with a `roleType` of `"CREW"` and includes a `job` field.
 * - **Cast**: Represents a cast member with a `roleType` of `"CAST"` and includes `characterName` and `billingOrder` fields.
 *
 * The schema extends `MovieCreditBaseSchema` by adding identifiers for the movie and person, as well as a read-only `_id` field.
 */
export const MovieCreditPopulatedSchema = z.discriminatedUnion("roleType", [CrewSchema, CastSchema]);

/**
 * Type representing a fully populated movie credit object,
 * inferred from the `MovieCreditPopulatedSchema`.
 *
 * This type is typically used when credits are loaded from the database
 * or API responses that include full `movie` and `person` data.
 */
export type PopulatedMovieCredit = z.infer<typeof MovieCreditPopulatedSchema>;