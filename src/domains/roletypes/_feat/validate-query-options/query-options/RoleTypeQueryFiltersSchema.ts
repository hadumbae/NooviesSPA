/**
 * @fileoverview Defines the Zod schema and type for filtering RoleType queries.
 */

import {z} from "zod";
import {RoleTypeDepartmentSchema} from "@/domains/roletypes/_schema/fields/RoleTypeDepartmentSchema";
import {preprocessOptionalField} from "@/common/_feat";
import {RoleTypeNameSchema} from "@/domains/roletypes";

/** Zod schema for validating RoleType query filter parameters. */
export const RoleTypeQueryFiltersSchema = z.object({
    department: preprocessOptionalField(RoleTypeDepartmentSchema),
    roleName: preprocessOptionalField(RoleTypeNameSchema),
});
/** Represents the optional filters that can be applied when querying RoleType records. */
export type RoleTypeQueryFilters = z.infer<typeof RoleTypeQueryFiltersSchema>;