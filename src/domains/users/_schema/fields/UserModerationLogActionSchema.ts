/**
 * @fileoverview Defines the schema and type for user moderation log actions.
 */

import {UserModerationLogActionConstant} from "@/domains/users";
import {ZodEnumParamHandler} from "@/common/_feat";
import {z} from "zod";

/** Zod schema for validating user moderation log action codes. */
export const UserModerationLogActionSchema = z.enum(UserModerationLogActionConstant, ZodEnumParamHandler({
    invalidValue: "Must be a valid action code.",
    invalidType: "Must be a valid action code string.",
}));

/** Type inferred from the UserModerationLogActionSchema. */
export type UserModerationLogAction = z.infer<typeof UserModerationLogActionSchema>;