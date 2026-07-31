/**
 * @fileoverview Defines the constant list of valid moderation log actions for users.
 */

/** List of actions that can be recorded in a user moderation log. */
export const UserModerationLogActionConstant = [
    "user_role_update",
    "user_role_grant_admin",
    "user_role_revoke_admin",
    "user_registered",
    "user_suspended",
] as const;