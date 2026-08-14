/**
 * @fileoverview Defines the validation schema and types for role type index query options.
 */

import {z} from "zod";
import {RoleTypeQueryOptionsSchema} from "@/domains/roletypes/_feat/validate-query-options/query-options";

/** Zod schema for validating query options when listing role types in the index view. */
export const RoleTypeIndexQueryOptionsSchema = RoleTypeQueryOptionsSchema.pick({
    roleName: true,
    department: true,
    sortByRoleName: true,
    sortByDepartment: true,
});

/** Inferred TypeScript type for role type index query options. */
export type RoleTypeIndexQueryOptions = z.infer<typeof RoleTypeIndexQueryOptionsSchema>;

/** Form values type inferred from the role type index query options schema. */
export type RoleTypeIndexQueryOptionsFormValues = z.infer<typeof RoleTypeIndexQueryOptionsSchema>;