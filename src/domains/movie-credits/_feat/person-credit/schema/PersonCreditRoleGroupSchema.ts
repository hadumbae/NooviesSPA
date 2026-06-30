/**
 * @fileoverview Schemas for grouping a person's movie credits by their specific role titles.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {RoleTypeDepartmentSchema} from "@/domains/roletypes/_schema/fields/RoleTypeDepartmentSchema.ts";
import {PersonCreditSchema} from "@/domains/movie-credits/_feat/person-credit/schema/PersonCreditSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {RoleTypeSchema} from "@/domains/roletypes/_schema/model/RoleTypeSchema.ts";
import {generateArraySchema} from "@/common/_feat/validation-builders";

/**
 * Schema representing a collection of movie credits associated with a single role name.
 */
export const PersonCreditRoleGroupSchema = z.object({
    role: NonEmptyStringSchema.max(150, "Must be 150 characters or less."),
    department: RoleTypeDepartmentSchema,
    totalCredits: NonNegativeNumberSchema,
    topCredits: generateArraySchema(PersonCreditSchema),
    roleType: RoleTypeSchema,
});

/**
 * Validated type for a single group of a person's movie credits organized by role.
 */
export type PersonCreditRoleGroup = z.infer<typeof PersonCreditRoleGroupSchema>;

