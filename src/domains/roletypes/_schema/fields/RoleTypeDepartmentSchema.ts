/**
 * @fileoverview Zod schema and type definitions for role type departments.
 */

import {z} from "zod";
import {ZodEnumParamHandler} from "@/common/_feat";
import {RoleTypeDepartmentConstant} from "@/domains/roletypes/_const/RoleTypeDepartmentConstant.ts";

/** Zod schema for validating role type department strings. */
export const RoleTypeDepartmentSchema = z.enum(RoleTypeDepartmentConstant, ZodEnumParamHandler({
    invalidValue: "Must be `CAST` or `CREW`.",
    invalidType: "Must be a valid `Department` string.",
}));

/** Union type of valid role type departments. */
export type RoleTypeDepartment = z.infer<typeof RoleTypeDepartmentSchema>;
