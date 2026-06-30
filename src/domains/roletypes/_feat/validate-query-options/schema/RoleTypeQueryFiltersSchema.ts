/**
 * @fileoverview Defines the Zod schema and type for filtering RoleType queries.
 */

import {z} from "zod";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors/preprocessEmptyStringToUndefined";
import {RoleTypeDepartmentSchema} from "@/domains/roletypes/_schema/fields/RoleTypeDepartmentSchema";
import {StringValueSchema} from "@/common/_schemas/strings/StringValueSchema";

/** Zod schema for validating RoleType query filter parameters. */
export const RoleTypeQueryFiltersSchema = z.object({
    department: preprocessEmptyStringToUndefined(RoleTypeDepartmentSchema.optional()).optional(),
    roleName: StringValueSchema.max(150, {message: "Must be 150 characters or less."}).optional()
});
/** Represents the optional filters that can be applied when querying RoleType records. */
export type RoleTypeQueryFilters = z.infer<typeof RoleTypeQueryFiltersSchema>;