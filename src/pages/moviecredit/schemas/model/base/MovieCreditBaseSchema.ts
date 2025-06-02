import {z} from "zod";

import {RoleTypeEnumSchema} from "@/pages/moviecredit/schemas/enums/RoleTypeEnumSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/PositiveNumberSchema.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";

/**
 * Schema representing the base structure of a movie credit.
 *
 * This schema is used to validate and enforce the shape of movie credit data.
 * It includes metadata about the role played by a person in a film, such as their job,
 * character name, and additional flags related to how the credit should be interpreted.
 *
 * Fields:
 * - `roleType`: Required. Enum representing the type of role (e.g., Actor, Director).
 * - `notes`: Optional. Freeform notes or annotations about the credit.
 * - `job`: Optional. Specific job title if applicable (e.g., "Cinematographer").
 * - `characterName`: Optional. Name of the character portrayed, if applicable.
 * - `billingOrder`: Optional. Positive number representing the billing order in credits.
 * - `uncredited`: Optional. Boolean indicating whether the individual was uncredited.
 * - `voiceOnly`: Optional. Boolean indicating the role was voice-only.
 * - `cameo`: Optional. Boolean indicating a cameo appearance.
 * - `motionCapture`: Optional. Boolean indicating the role involved motion capture.
 */
export const MovieCreditBaseSchema = z.object({
    roleType: RoleTypeEnumSchema,
    notes: NonEmptyStringSchema.nullable().optional(),

    job: NonEmptyStringSchema.optional(),

    characterName: NonEmptyStringSchema.optional(),
    billingOrder: PositiveNumberSchema.optional(),

    uncredited: RequiredBoolean.optional(),
    voiceOnly: RequiredBoolean.optional(),
    cameo: RequiredBoolean.optional(),
    motionCapture: RequiredBoolean.optional(),
});