import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {RoleTypeEnumSchema} from "@/pages/moviecredit/schemas/enums/RoleTypeEnumSchema.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Schema for validating query parameters used to filter movie credits.
 *
 * These filters are typically sent via URL query strings and determine
 * which movie credits are shown in search or listing pages.
 */
export const MovieCreditFilterSchema = z.object({
    /** Partial or full name of the person associated with the credit. */
    name: NonEmptyStringSchema.optional(),

    /** Partial or full title of the movie. */
    title: NonEmptyStringSchema.optional(),

    /** Unique ID of the movie (as a string). */
    movie: IDStringSchema.optional(),

    /** Unique ID of the person (as a string). */
    person: IDStringSchema.optional(),

    /** Enum value representing the role type (e.g., cast, crew). */
    roleType: RoleTypeEnumSchema.optional(),

    /** Job title or function of the credit (e.g., Director, Editor). */
    job: NonEmptyStringSchema.optional(),

    /** Name of the character portrayed by the person. */
    characterName: NonEmptyStringSchema.optional(),

    /** Billing order of the person in the movie credit list (must be positive). */
    billingOrder: PositiveNumberSchema.optional(),

    /** Whether the person was uncredited in the role. */
    uncredited: RequiredBoolean.optional(),

    /** Whether the role was voice-only. */
    voiceOnly: RequiredBoolean.optional(),

    /** Whether the appearance was a cameo. */
    cameo: RequiredBoolean.optional(),

    /** Whether the performance was motion capture. */
    motionCapture: RequiredBoolean.optional(),
});

/**
 * Inferred TypeScript type representing the structure of movie credit filters.
 */
export type MovieCreditFilters = z.infer<typeof MovieCreditFilterSchema>;