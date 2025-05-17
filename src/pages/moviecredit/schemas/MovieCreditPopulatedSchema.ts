import {MovieCreditBaseSchema} from "@/pages/moviecredit/schemas/MovieCreditBaseSchema.ts";
import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/PositiveNumberSchema.ts";
import {MovieSchema} from "@/pages/movies/schema/MovieSchema.ts";
import {PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";

const MovieCreditObjectSchema = MovieCreditBaseSchema.extend({
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
 * Common Fields (from `MovieCreditBaseSchema` and extended):
 * - `movie`: Required. A full `MovieSchema` object.
 * - `person`: Required. A full `PersonSchema` object.
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
 *   - `job`: Required. Specific crew job title (e.g., "Composer", "Editor").
 *   - `characterName`: Omitted.
 *   - `billingOrder`: Omitted.
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