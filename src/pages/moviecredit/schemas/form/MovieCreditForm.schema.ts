import { z } from "zod";
import { FormStarterValueSchema } from "@/common/schema/form/FormStarterValueSchema.ts";
import { RefinedIDStringSchema } from "@/common/schema/strings/RefinedIDStringSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/NonEmptyStringSchema.ts";
import { CleanedPositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { RequiredBoolean } from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import { FalseForCrewSchema, UndefinedForCrewSchema } from "@/pages/moviecredit/schemas/MovieCreditCrewSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";

/**
 * Schema representing the **form values** for a movie credit.
 * All fields are initially represented as `FormStarterValueSchema` (placeholder/initial value).
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
 * Base schema for a movie credit form.
 * Fields are preprocessed and validated for proper types and lengths.
 */
export const MovieCreditFormBaseSchema = z.object({
    /** Movie ID */
    movie: RefinedIDStringSchema,
    /** Person ID */
    person: RefinedIDStringSchema,
    /** Role type ID */
    roleType: RefinedIDStringSchema,
    /** Optional display name for the role */
    displayRoleName: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, { message: "Must be 150 characters or less." }).optional()
    ),
    /** Optional notes for the credit */
    notes: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(1000, { message: "Must be 1000 characters or less." }).optional()
    ),
});

/**
 * Schema for submitting a **CREW** movie credit.
 * Enforces crew-specific rules:
 * - `department` must be `"CREW"`.
 * - Several fields must be `false` or `undefined`.
 */
export const MovieCreditSubmitCrewSchema = MovieCreditFormBaseSchema.extend({
    department: z.literal("CREW", { required_error: "Required.", message: "Must be `CREW`." }),
    billingOrder: preprocessEmptyStringToUndefined(UndefinedForCrewSchema),
    characterName: preprocessEmptyStringToUndefined(UndefinedForCrewSchema),
    creditedAs: preprocessEmptyStringToUndefined(UndefinedForCrewSchema),
    isPrimary: FalseForCrewSchema,
    uncredited: FalseForCrewSchema,
    voiceOnly: FalseForCrewSchema,
    cameo: FalseForCrewSchema,
    motionCapture: FalseForCrewSchema,
    archiveFootage: FalseForCrewSchema,
});

/**
 * Shared schema fields for CAST credits.
 */
const castSharedFields = {
    department: z.literal("CAST", { required_error: "Required.", message: "Must be `CAST`." }),
    characterName: NonEmptyStringSchema.max(150, { message: "Must be 150 characters or less." }),
    billingOrder: CleanedPositiveNumberSchema,
    creditedAs: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, { message: "Must be 150 characters or less." }).optional()
    ),
    isPrimary: RequiredBoolean.optional(),
    uncredited: RequiredBoolean.optional(),
    voiceOnly: RequiredBoolean.optional(),
    cameo: RequiredBoolean.optional(),
    motionCapture: RequiredBoolean.optional(),
    archiveFootage: RequiredBoolean.optional(),
};

/**
 * Schema for CAST credits using **only shared fields**.
 */
export const MovieCreditFormCastOnlySchema = z.object(castSharedFields);

/**
 * Schema for a CAST movie credit including base fields and shared fields.
 */
export const MovieCreditFormCastSchema = MovieCreditFormBaseSchema.extend(castSharedFields);

/**
 * Discriminated union schema for movie credits.
 * Validates either a CREW credit or a CAST credit based on `department`.
 */
export const MovieCreditFormSchema = z.discriminatedUnion("department", [
    MovieCreditSubmitCrewSchema,
    MovieCreditFormCastSchema,
]);
