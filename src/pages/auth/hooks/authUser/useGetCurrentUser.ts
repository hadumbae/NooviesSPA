/**
 * @file useGetCurrentUser.ts
 *
 * Hook for retrieving the currently authenticated user.
 * Throws an `UnauthorisedError` if no user is present.
 */

import {User} from "@/pages/users/schemas/user/User.types.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";
import useCurrentURLPath from "@/common/hooks/router/useCurrentURLPath.ts";
import {UnauthorisedError} from "@/common/errors/UnauthorisedError.ts";

type GetProps = {
    /** Optional identifier describing where the hook is used */
    source?: string;
};

/**
 * Returns the currently authenticated user.
 *
 * Intended for protected routes or components where
 * authentication is required.
 *
 * @param source - Optional identifier for error diagnostics
 *
 * @throws {UnauthorisedError}
 * Thrown when no authenticated user is available. Includes
 * redirect metadata pointing to the current URL.
 */
export function useGetCurrentUser(
    {source}: GetProps = {}
): User {
    const currentURLPath = useCurrentURLPath();

    const {user} = useRequiredContext({
        context: AuthContext,
        message: "Must be used within an auth context provider.",
    });

    if (!user) {
        throw new UnauthorisedError({
            message: "Unauthorised.",
            redirectPath: currentURLPath,
            source,
        });
    }

    return user;
}
