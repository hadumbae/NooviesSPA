/**
 * @fileoverview React Query mutation hook for refreshing authentication tokens and fetching the current user profile.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {User, UserSchema} from "@/domains/users/_schema/user/UserSchema";
import {AuthMutationKeys} from "@/domains/auth/_feat/common/AuthMutationKeys.ts";
import {postRefreshAuthentication} from "@/domains/auth/_feat/user-refresh/postRefreshAuthentication.ts";

/** Triggers a session refresh request and validates the returned user profile data. */
export function useAuthRefreshToken(): UseMutationResult<User, unknown, void> {
    const refreshUserData = async (): Promise<User> => {
        const {result} = await postRefreshAuthentication();
        const {data: parsedData, success, error} = validateData({
            data: result,
            schema: UserSchema,
            message: "Invalid Refresh API Response.",
        });

        if (!success) throw error;
        return parsedData;
    };

    return useMutation({
        mutationKey: AuthMutationKeys.refresh(),
        mutationFn: refreshUserData,
    });
}