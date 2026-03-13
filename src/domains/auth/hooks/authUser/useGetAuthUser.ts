/**
 * @file useGetAuthUser.ts
 *
 * Convenience hook for accessing the authenticated user
 * from the Auth context.
 *
 * Throws if used outside of `AuthContext` provider.
 */

import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {AuthContext} from "@/domains/auth/context/AuthContext.ts";
import {User} from "@/domains/users/schemas/user/User.types.ts";

/**
 * Returns the currently authenticated user.
 *
 * @returns The authenticated user, or `null` if not logged in
 *
 * @throws Error if used outside `AuthContext` provider
 */
export function useGetAuthUser(): User | null {
    const {user} = useRequiredContext({
        context: AuthContext,
        message: "Must be used in the provider for the auth context.",
    });

    return user;
}
