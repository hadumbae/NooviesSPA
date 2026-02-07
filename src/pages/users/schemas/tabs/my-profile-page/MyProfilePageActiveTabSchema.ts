/**
 * @file MyProfilePageTabSchema.ts
 *
 * Zod schema for validating My Profile page tab values.
 * Ensures only supported tab keys are accepted.
 */

import {z} from "zod";
import {MyProfilePageTabListConstant} from "@/pages/users/schemas/tabs/my-profile-page/MyProfilePageTabConstants.ts";

/**
 * Runtime schema for profile page tab keys.
 *
 * Provides user-friendly error messages for invalid
 * enum values and incorrect types.
 */
export const MyProfilePageActiveTabSchema = z.enum(
    MyProfilePageTabListConstant,
    {
        errorMap: (issue, ctx) => {
            if (issue.code === z.ZodIssueCode.invalid_enum_value) {
                return {message: "Invalid value."};
            }

            if (issue.code === z.ZodIssueCode.invalid_type) {
                return {message: "Must be a valid string."};
            }

            return {message: ctx.defaultError};
        },
    },
);

/**
 * Type-safe union of valid profile page tab keys.
 */
export type MyProfilePageActiveTab = z.infer<typeof MyProfilePageActiveTabSchema>;
