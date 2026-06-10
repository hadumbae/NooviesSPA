/**
 * @fileoverview Schemas for grouping a person's movie credits by their specific role titles.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {RoleTypeDepartmentSchema} from "@/domains/roletype/schema/fields/RoleTypeDepartmentSchema.ts";
import {PersonCreditSchema} from "@/domains/moviecredit/_feat/person-credit/schemas/PersonCreditSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {RoleTypeSchema} from "@/domains/roletype/schema/model/RoleTypeSchema.ts";
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

