/**
 * @fileoverview Match-level filters for MovieCredit queries.
 * Maps request query parameters to internal schema fields for direct
 * document-level filtering.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas";
import {RoleTypeDepartmentSchema} from "@/domains/roletypes/_schema/fields/RoleTypeDepartmentSchema.ts";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {CoercedBooleanValueSchema} from "@/common/_schemas/boolean/CoercedBooleanValueSchema.ts";
import {PositiveNumberSchema} from "@/common/_schemas/numbers/positive-number/PositiveNumberSchema";

/**
 * Match-level filters for MovieCredit queries.
 */
export const MovieCreditQueryMatchFiltersSchema = z.object({
    _id: IDStringSchema.optional(),
    movie: IDStringSchema.optional(),
    person: IDStringSchema.optional(),
    roleType: IDStringSchema.optional(),
    department: RoleTypeDepartmentSchema.optional(),
    characterName: NonEmptyStringSchema.optional(),
    billingOrder: PositiveNumberSchema.optional(),
    uncredited: CoercedBooleanValueSchema.optional(),
    voiceOnly: CoercedBooleanValueSchema.optional(),
    cameo: CoercedBooleanValueSchema.optional(),
    motionCapture: CoercedBooleanValueSchema.optional(),
    isPrimary: CoercedBooleanValueSchema.optional(),
    archiveFootage: CoercedBooleanValueSchema.optional(),
    displayRoleName: NonEmptyStringSchema
        .max(150, {message: "Must be 150 characters or less."})
        .optional(),
    creditedAs: NonEmptyStringSchema
        .max(150, {message: "Must be 150 characters or less."})
        .optional(),
});

/**
 * Validated match-level filter parameters.
 */
export type MovieCreditQueryMatchFilters = z.infer<typeof MovieCreditQueryMatchFiltersSchema>;