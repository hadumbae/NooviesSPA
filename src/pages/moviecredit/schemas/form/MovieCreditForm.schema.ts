import {z} from "zod";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {
    PositiveNumberSchema
} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {UndefinedForCrewSchema} from "@/pages/moviecredit/schemas/MovieCreditCrewSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Schema representing the **raw form values** for a movie credit.
 *
 * - Each field is initially a `FormStarterValueSchema` (placeholder / initial value).
 * - Used mainly for capturing unprocessed form state before validation/refinement.
 */
export const MovieCreditFormValuesSchema = z.object({
    movie: FormStarterValueSchema,
    person: FormStarterValueSchema,
    department: FormStarterValueSchema,
    roleType: FormStarterValueSchema,
    displayRoleName: FormStarterValueSchema,
    notes: FormStarterValueSchema,
    creditedAs: FormStarterValueSchema,
    characterName: FormStarterValueSchema,
    billingOrder: FormStarterValueSchema,
    isPrimary: FormStarterValueSchema,
    uncredited: FormStarterValueSchema,
    voiceOnly: FormStarterValueSchema,
    cameo: FormStarterValueSchema,
    motionCapture: FormStarterValueSchema,
    archiveFootage: FormStarterValueSchema,
});

/**
 * Base schema for a **movie credit form**.
 *
 * Provides core fields common to both CAST and CREW credits.
 * Includes preprocessing of empty strings → `undefined`
 * and enforces validation rules (IDs, max lengths).
 */
export const MovieCreditFormBaseSchema = z.object({
    /** Unique ID of the movie. */
    movie: IDStringSchema,
    /** Unique ID of the person. */
    person: IDStringSchema,
    /** Role type identifier (links to role categories). */
    roleType: IDStringSchema,
    /** Optional display name for the credited role. */
    displayRoleName: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, {message: "Must be 150 characters or less."}).optional()
    ),
    /** Alternative credited name (optional). */
    creditedAs: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, {message: "Must be 150 characters or less."}).optional()
    ),
    /** Optional free-form notes for the credit. */
    notes: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(1000, {message: "Must be 1000 characters or less."}).optional()
    ),
});

/**
 * Schema for a **CREW movie credit submission**.
 *
 * - Enforces `department = "CREW"`.
 * - CAST-specific fields (e.g. `characterName`) are disallowed (`UndefinedForCrewSchema`).
 */
export const MovieCreditSubmitCrewSchema = MovieCreditFormBaseSchema.extend({
    department: z.literal("CREW", {required_error: "Required.", message: "Must be `CREW`."}),
    billingOrder: UndefinedForCrewSchema,
    characterName: UndefinedForCrewSchema,
    isPrimary: UndefinedForCrewSchema,
    uncredited: UndefinedForCrewSchema,
    voiceOnly: UndefinedForCrewSchema,
    cameo: UndefinedForCrewSchema,
    motionCapture: UndefinedForCrewSchema,
    archiveFootage: UndefinedForCrewSchema,
});

/**
 * Shared CAST-only fields for movie credits.
 *
 * These are added on top of {@link MovieCreditFormBaseSchema} when
 * creating a CAST credit form.
 */
const castSharedFields = {
    /** Department must always be `"CAST"`. */
    department: z.literal("CAST", {required_error: "Required.", message: "Must be `CAST`."}),
    /** Character name as displayed in credits (required). */
    characterName: NonEmptyStringSchema.max(150, {message: "Must be 150 characters or less."}),
    /** Billing order for the role (positive number, optional, strings coerced). */
    billingOrder: z.preprocess(
        (val) => {
            if (typeof val !== "number" && !(typeof val === "string" && val !== "") ) return undefined;

            const num = Number(val);
            return !isNaN(num) ? num : undefined;
        },
        PositiveNumberSchema.optional(),
    ),
    /** Whether the role is considered the actor's *primary* role. */
    isPrimary: CoercedBooleanValueSchema.optional(),
    /** Whether the actor is uncredited. */
    uncredited: CoercedBooleanValueSchema.optional(),
    /** Whether the role is voice-only. */
    voiceOnly: CoercedBooleanValueSchema.optional(),
    /** Whether the role is a cameo. */
    cameo: CoercedBooleanValueSchema.optional(),
    /** Whether the role involves motion capture. */
    motionCapture: CoercedBooleanValueSchema.optional(),
    /** Whether the role uses archive footage. */
    archiveFootage: CoercedBooleanValueSchema.optional(),
};

/**
 * Schema for a **CAST-only credit**.
 *
 * Contains only the CAST-specific fields without base fields like `movie`/`person`.
 * Useful for form components that only deal with CAST data.
 */
export const MovieCreditFormCastOnlySchema = z.object(castSharedFields);

/**
 * Schema for a **CAST credit**.
 *
 * Extends {@link MovieCreditFormBaseSchema} with CAST-specific fields.
 */
export const MovieCreditFormCastSchema = MovieCreditFormBaseSchema.extend(castSharedFields);

/**
 * Discriminated union schema for movie credits.
 *
 * - Accepts either a **CREW** credit ({@link MovieCreditSubmitCrewSchema})
 *   or a **CAST** credit ({@link MovieCreditFormCastSchema}).
 * - Discrimination key: `department`.
 */
export const MovieCreditFormSchema = z.discriminatedUnion("department", [
    MovieCreditSubmitCrewSchema,
    MovieCreditFormCastSchema,
]);
