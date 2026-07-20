/**
 * @fileoverview Custom hook for accessing the authentication context.
 */

import {useContext} from "react";
import {InvalidContextError} from "@/common/_err/invalid-context";
import {AuthContext, AuthUserContextValue} from "@/domains/auth/_feat/manage-auth-user-data/context";

/**
 * Retrieves the current authentication context value.
 * Must be used within an AuthContext provider.
 */
export function useAuthContext(): AuthUserContextValue {
    const context = useContext(AuthContext);

    if (!context) {
        const message = `Must be used within a provider for "${AuthContext.displayName}"`;
        throw new InvalidContextError({code: "required_provider", contextName: AuthContext.displayName, message});
    }

    return context;
}