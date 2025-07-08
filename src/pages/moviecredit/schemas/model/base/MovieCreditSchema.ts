import {MovieCreditBaseSchema} from "@/pages/moviecredit/schemas/model/base/MovieCreditBaseSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {z, ZodType} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {MovieSchema} from "@/pages/movies/schema/model/MovieSchema.ts";
import {PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";
import {IMovieCredit} from "@/pages/moviecredit/interfaces/IMovieCredit.ts";

/**
 * Schema for a generic movie credit, extended from the base schema.
 *
 * Fields include:
 * - `_id`: Unique identifier for the credit (read-only)
 * - `movie`: Either a movie ID or full movie object
 * - `person`: Either a person ID or full person object
 */
const MovieCreditReadSchema = MovieCreditBaseSchema.extend({
    _id: IDStringSchema.readonly(),
    movie: z.union([IDStringSchema, z.lazy(() => MovieSchema)]),
    person: z.union([IDStringSchema, z.lazy(() => PersonSchema)]),
});

/**
 * Schema for crew-type movie credits.
 *
 * Fields:
 * - `roleType`: Literal `"CREW"`
 * - `job`: The crew member's job (e.g., Director, Composer)
 */
const CrewSchema = MovieCreditReadSchema.extend({
    roleType: z.literal("CREW"),
    job: NonEmptyStringSchema,
});

/**
 * Schema for cast-type movie credits.
 *
 * Fields:
 * - `roleType`: Literal `"CAST"`
 * - `characterName`: Name of the character played
 * - `billingOrder`: Display order in the cast list
 */
const CastSchema = MovieCreditReadSchema.extend({
    roleType: z.literal("CAST"),
    characterName: NonEmptyStringSchema,
    billingOrder: PositiveNumberSchema,
});

/**
 * Discriminated union of cast and crew schemas based on the `roleType` field.
 *
 * This schema supports type-safe parsing of either `CAST` or `CREW` credit data.
 */
export const MovieCreditRawSchema = z.discriminatedUnion("roleType", [CrewSchema, CastSchema]);

/**
 * Refined and typed version of `MovieCreditRawSchema`, cast to the `IMovieCredit` interface.
 *
 * Used for runtime validation and static typing of movie credit data.
 */
export const MovieCreditSchema = MovieCreditRawSchema as ZodType<IMovieCredit>;

/**
 * Inferred TypeScript type from `MovieCreditSchema`.
 *
 * Represents the union of all valid cast and crew credit objects.
 */
export type MovieCredit = z.infer<typeof MovieCreditSchema>;