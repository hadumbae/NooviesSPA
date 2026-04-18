/**
 * @fileoverview Schemas for grouping a person's movie credits by their specific role titles.
 * This structure is optimized for front-end "Filmography" sections where credits need
 * to be categorized under headers like "Director", "Actor", or "Producer".
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {RoleTypeDepartmentEnumSchema} from "@/domains/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {PersonCreditSchema} from "@/domains/moviecredit/_feat/person-credit/schemas/PersonCreditSchema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {RoleTypeSchema} from "@/domains/roletype/schema/model/RoleType.schema.ts";

/**
 * Schema representing a collection of movie credits associated with a single role name.
 */
export const PersonCreditRoleGroupSchema = z.object({
    role: NonEmptyStringSchema.max(150, "Must be 150 characters or less."),
    department: RoleTypeDepartmentEnumSchema,
    totalCredits: NonNegativeNumberSchema,
    topCredits: generateArraySchema(PersonCreditSchema),
    roleType: RoleTypeSchema,
});

/**
 * Validated type for a single group of a person's movie credits organized by role.
 */
export type PersonCreditRoleGroup = z.infer<typeof PersonCreditRoleGroupSchema>;

