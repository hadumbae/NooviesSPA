import {MovieCreditBaseSchema} from "@/pages/moviecredit/schemas/MovieCreditBaseSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/PositiveNumberSchema.ts";

const MovieCreditWriteSchema = MovieCreditBaseSchema.extend({movie: IDStringSchema, person: IDStringSchema});

const CrewSchema = MovieCreditWriteSchema.extend({
    roleType: z.literal("CREW"),
    job: NonEmptyStringSchema,
}).omit({characterName: true, billingOrder: true});

const CastSchema = MovieCreditWriteSchema.extend({
    roleType: z.literal("CAST"),
    characterName: NonEmptyStringSchema,
    billingOrder: PositiveNumberSchema,
}).omit({job: true});

/**
 * Schema for submitting a movie credit, either as cast or crew.
 *
 * This is a discriminated union schema based on the `roleType` field, extending `MovieCreditBaseSchema`.
 * It adds the associated `movie` and `person` references, and includes role-specific requirements.
 *
 * Common Fields (from `MovieCreditBaseSchema` and extended):
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
export const MovieCreditSubmitSchema = z.discriminatedUnion("roleType", [CrewSchema, CastSchema]);

/**
 * Type representing the shape of valid movie credit submission data,
 * inferred from the `MovieCreditSubmitSchema`.
 *
 * This union type supports either a `CAST` or `CREW` credit structure as described above.
 */
export type MovieCreditSubmit = z.infer<typeof MovieCreditSubmitSchema>;