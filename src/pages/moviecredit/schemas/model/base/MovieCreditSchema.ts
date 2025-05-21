import {MovieCreditBaseSchema} from "@/pages/moviecredit/schemas/model/base/MovieCreditBaseSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {z, ZodType} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/PositiveNumberSchema.ts";
import {MovieSchema} from "@/pages/movies/schema/model/MovieSchema.ts";
import {PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";
import {IMovieCredit} from "@/pages/moviecredit/interfaces/IMovieCredit.ts";

const MovieCreditReadSchema = MovieCreditBaseSchema.extend({
    _id: IDStringSchema.readonly(),
    movie: z.union([IDStringSchema, z.lazy(() => MovieSchema)], {message: "Invalid Movie Type."}),
    person: z.union([IDStringSchema, z.lazy(() => PersonSchema)], {message: "Invalid Person Type."}),
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
 * Schema representing a validated movie credit, either as cast or crew.
 *
 * This is a discriminated union schema based on the `roleType` field, extending `MovieCreditBaseSchema`.
 * It includes common credit metadata along with structured distinctions for cast and crew roles.
 *
 * Common Fields (from `MovieCreditBaseSchema` and extended):
 * - `_id`: A read-only string ID.
 * - `movie`: Either a string ID or a full `MovieSchema` object. Represents the associated movie.
 * - `person`: Either a string ID or a full `PersonSchema` object. Represents the credited person.
 * - `notes`: Optional. Freeform annotation or remarks about the credit.
 * - `uncredited`: Optional. Boolean indicating the person was not officially credited.
 * - `voiceOnly`: Optional. Boolean indicating a voice-only performance.
 * - `cameo`: Optional. Boolean indicating a cameo appearance.
 * - `motionCapture`: Optional. Boolean indicating performance via motion capture.
 *
 * Variants:
 * - **CAST**
 *   - `roleType`: `"CAST"`
 *   - `characterName`: Required. Name of the character portrayed.
 *   - `billingOrder`: Required. Positive number indicating the billing sequence in credits.
 *   - `job`: Omitted.
 *
 * - **CREW**
 *   - `roleType`: `"CREW"`
 *   - `job`: Required. Specific crew job title (e.g., "Director of Photography").
 *   - `characterName`: Omitted.
 *   - `billingOrder`: Omitted.
 */
export const MovieCreditSchema: ZodType<IMovieCredit> = z.discriminatedUnion("roleType", [CrewSchema, CastSchema]);

/**
 * Type representing a validated movie credit object,
 * inferred from the `MovieCreditSchema`.
 *
 * This union type supports either a `CAST` or `CREW` credit structure.
 */
export type MovieCredit = z.infer<typeof MovieCreditSchema>;