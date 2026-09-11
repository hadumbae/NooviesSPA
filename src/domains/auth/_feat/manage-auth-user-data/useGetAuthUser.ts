/**
 * @fileoverview Hook for accessing the authenticated user from the Auth context.
 */

import {User} from "@/domains/users/_schema/user/UserSchema";
import {useAuthContext} from "@/domains/auth/_feat/auth-context/useAuthContext.ts";

/**
 * Returns the currently authenticated user.
 * Requires wrapping in an AuthContext provider.
 */
export function useGetAuthUser(): User | null {
    const {user} = useAuthContext();
    return user;
}
