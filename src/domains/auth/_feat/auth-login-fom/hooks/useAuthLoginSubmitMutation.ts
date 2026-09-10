import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {validateData} from "@/common/_feat/validate-data/validateData.ts";
import {User, UserSchema} from "@/domains/users/_schema/user/UserSchema";
import {AuthLoginFormData} from "@/domains/auth/_feat/auth-login-fom/schema/AuthLoginFormSchema.ts";
import {loginUser} from "@/domains/auth/_feat/access-auth-backend/repository/AuthRepository.ts";

export function useAuthLoginSubmitMutation(): UseMutationResult<User, unknown, AuthLoginFormData> {
    const submitLoginData = async (data: AuthLoginFormData): Promise<User> => {
        const {result} = await loginUser(data);
        const {data: parsedData, success, error} = validateData({
            data: result,
            schema: UserSchema,
            message: "Invalid Login API Response.",
        });

        if (!success) throw error;
        return parsedData;
    };

    return useMutation({
        mutationKey: ["submit_login_data"],
        mutationFn: submitLoginData,
    });
}
