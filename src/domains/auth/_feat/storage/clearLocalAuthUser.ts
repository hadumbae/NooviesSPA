/**
 * @fileoverview Utility function for removing stored user authentication state from local storage.
 */

import {User, UserSchema} from "@/domains/users/_schema/user/UserSchema.ts";

/** Clears the persisted authentication user data from local storage. */
export function clearLocalAuthUser(): User | null {
    const userString = localStorage.getItem("authUser");
    localStorage.removeItem("authUser");

    try {
        if (!userString) return null;
        const userObject = JSON.parse(userString);
        const {data: user, success} = UserSchema.safeParse(userObject);
        return success && user ? user : null;
    } catch (error: unknown) {
        return null;
    }
}