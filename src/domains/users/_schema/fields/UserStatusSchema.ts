/**
 * @fileoverview Validation schemas and types for user status lifecycle values with unified error handling.
 */

import {z} from "zod";
import {UserStatusConstant} from "@/domains/users/_const";
import {ZodEnumParamHandler} from "@/common/_feat";

/** Zod schema validating that a string matches a recognised user status with parameterised error custom handlers. */
export const UserStatusSchema = z.enum(UserStatusConstant, ZodEnumParamHandler({
    invalidType: "Must be a valid user status string.",
    invalidValue: "Must be a valid user status."
}) );

/** TypeScript type inferred from the UserStatusSchema. */
export type UserStatus = z.infer<typeof UserStatusSchema>;