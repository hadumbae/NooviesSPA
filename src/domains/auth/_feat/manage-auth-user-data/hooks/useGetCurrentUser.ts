/**
 * @fileoverview Hook for retrieving the currently authenticated user from the AuthContext.
 *
 */

import {useCurrentURLPath} from "@/common/_feat/navigation/useCurrentURLPath.ts";
import {UnauthorisedError} from "@/common/_err/UnauthorisedError.ts";
import {User} from "@/domains/users/_schema/user/UserSchema";
import {useAuthContext} from "@/domains/auth/_feat/manage-auth-user-data/hooks/useAuthContext.ts";


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
    const {user} = useAuthContext();

    if (!user) {
        const message = "Unauthorised.";
        throw new UnauthorisedError({message, redirectPath: currentURLPath, source});
    }

    return user;
}
