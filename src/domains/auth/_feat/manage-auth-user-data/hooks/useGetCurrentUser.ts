/**
 * @fileoverview Hook for retrieving the currently authenticated user from the AuthContext.
 *
 */

import useRequiredContext from "@/common/_feat/use-context/useRequiredContext.ts";
import {AuthContext} from "@/domains/auth/_feat/manage-auth-user-data/context/AuthContext.ts";
import {useCurrentURLPath} from "@/common/_feat/navigation/useCurrentURLPath.ts";
import {UnauthorisedError} from "@/common/_err/UnauthorisedError.ts";

import {User} from "@/domains/users/_schema/user/UserSchema";

/** Props for the useGetCurrentUser hook. */
type GetProps = {
    source?: string;
};

/**
 * Returns the currently authenticated user or throws an UnauthorisedError if no user is present.
 */
export function useGetCurrentUser(
    {source}: GetProps = {}
): User {
    const currentURLPath = useCurrentURLPath();
    const {user} = useRequiredContext({context: AuthContext});

    if (!user) {
        throw new UnauthorisedError({
            message: "Unauthorised.",
            redirectPath: currentURLPath,
            source,
        });
    }

    return user;
}
