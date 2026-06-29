/**
 * @fileoverview Zod schema and type definitions for role type departments.
 */

import {z} from "zod";
import {
    RoleTypeDepartmentConstant
} from "@/domains/roletypes/_schema/fields/RoleTypeDepartmentConstant.ts";

/** Zod schema for validating role type department strings. */
export const RoleTypeDepartmentSchema = z.enum(
    RoleTypeDepartmentConstant,
    {
        required_error: "Required.",
        message: "Invalid value. Must be `CAST` or `CREW`.",
        invalid_type_error: "Must be a valid `Department` string."
    },
);

/** Union type of valid role type departments. */
export type RoleTypeDepartment = z.infer<typeof RoleTypeDepartmentSchema>;
