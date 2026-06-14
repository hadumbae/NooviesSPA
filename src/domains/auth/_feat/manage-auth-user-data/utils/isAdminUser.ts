/**
 * @fileoverview Utility for determining user authorization levels based on roles.
 */

import {User} from "@/domains/users/schema/user/UserSchema";

/** Checks if the provided user object has the administrator role. */
export function isAdminUser(user?: User | null): boolean {
    return user?.roles.includes("ADMIN") ?? false;
}
