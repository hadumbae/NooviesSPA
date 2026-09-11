/**
 * @fileoverview React Query mutation hook for refreshing authentication tokens and fetching the current user profile.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {User} from "@/domains/users/_schema/user/UserSchema";
import {AuthMutationKeys} from "@/domains/auth/_feat/common/AuthMutationKeys.ts";
import {getUserAuthTokenRefreshPromise} from "@/domains/auth";

/** Triggers a session refresh request and validates the returned user profile data. */
export function useAuthRefreshToken(): UseMutationResult<User, unknown, void> {
    return useMutation({
        mutationKey: AuthMutationKeys.refresh(),
        mutationFn: getUserAuthTokenRefreshPromise,
    });
}