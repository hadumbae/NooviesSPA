import {User} from "@/pages/users/schemas/user/User.types.ts";

/**
 * Determines whether a user has administrator privileges.
 *
 * @remarks
 * - Safely handles `null` and `undefined` users
 * - Role matching is based on the presence of `"ADMIN"`
 *
 * @param user - Authenticated user to evaluate
 * @returns `true` if the user has the `ADMIN` role
 *
 * @example
 * ```ts
 * if (isAdminUser(user)) {
 *   // render admin-only controls
 * }
 * ```
 */
export default function isAdminUser(user?: User | null): boolean {
    return user?.roles.includes("ADMIN") ?? false;
}
