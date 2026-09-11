/**
 * @fileoverview Hook for managing the user login mutation and associated side effects.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {User, UserSchema} from "@/domains/users/_schema/user/UserSchema";
import {AuthLoginFormData} from "@/domains/auth/_feat/user-login/AuthLoginFormSchema.ts";
import {AuthMutationKeys} from "@/domains/auth/_feat/common/AuthMutationKeys.ts";
import {postLoginUser} from "@/domains/auth/_feat/user-login/postLoginUser.ts";

/** Hook to perform the user login mutation and parse the returned user data. */
export function useAuthLoginUser(): UseMutationResult<User, unknown, AuthLoginFormData> {
    const submitLoginData = async (data: AuthLoginFormData): Promise<User> => {
        const {result} = await postLoginUser(data);
        const {data: parsedData, success, error} = validateData({
            data: result,
            schema: UserSchema,
            message: "Invalid Login API Response.",
        });

        if (!success) throw error;
        return parsedData;
    };

    return useMutation({
        mutationKey: AuthMutationKeys.login(),
        mutationFn: submitLoginData,
    });
}
