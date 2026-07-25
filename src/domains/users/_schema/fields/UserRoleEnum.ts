/**
 * @fileoverview Defines the Zod schema and TypeScript type for user roles.
 */

import {z} from "zod";
import {UserRoleConstant} from "@/domains/users/_schema/fields/UserRoleConstant.ts";
import {ZodEnumParamHandler} from "@/common/_feat";

/** Zod schema for validating user roles against predefined constants. */
export const UserRoleEnumSchema = z.enum(UserRoleConstant, ZodEnumParamHandler({
    invalidValue: "Must be a valid user role.",
    invalidType: "Must be a valid user role string.",
}));

/** Type representing a valid user role string. */
export type UserRole = z.infer<typeof UserRoleEnumSchema>;
