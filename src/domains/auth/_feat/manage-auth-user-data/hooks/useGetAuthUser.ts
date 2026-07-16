/**
 * @fileoverview Hook for accessing the authenticated user from the Auth context.
 */

import useRequiredContext from "@/common/_feat/use-context/useRequiredContext.ts";
import {AuthContext} from "@/domains/auth/_feat/manage-auth-user-data/context";


import {User} from "@/domains/users/_schema/user/UserSchema";

/**
 * Returns the currently authenticated user.
 * Requires wrapping in an AuthContext provider.
 */
export function useGetAuthUser(): User | null {
    const {user} = useRequiredContext({context: AuthContext});
    return user;
}
