/**
 * @fileoverview Defines the schema and type for user moderation log actions.
 */

import {z} from "zod";
import {ZodEnumParamHandler} from "@/common/_feat";
import {UserModerationLogActionConstant} from "@/domains/users/_const";

/** Zod schema for validating user moderation log action codes. */
export const UserModerationLogActionSchema = z.enum(UserModerationLogActionConstant, ZodEnumParamHandler({
    invalidValue: "Must be a valid action code.",
    invalidType: "Must be a valid action code string.",
}));

/** Type inferred from the UserModerationLogActionSchema. */
export type UserModerationLogAction = z.infer<typeof UserModerationLogActionSchema>;