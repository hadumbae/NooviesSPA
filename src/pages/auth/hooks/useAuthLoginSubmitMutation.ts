import {useMutation} from "@tanstack/react-query";
import {AuthUserDetails, AuthUserDetailsSchema} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";
import {toast} from "react-toastify";
import {UserLoginData} from "@/pages/auth/schema/AuthLoginSchema.ts";
import {FetchError} from "@/common/errors/FetchError.ts";
import {UseFormReturn} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import AuthRepository from "@/pages/auth/repositories/AuthRepository.ts";
import useFetchErrorHandler from "@/common/handlers/query/FetchErrorHandler.ts";
import parseResponseData from "@/common/utility/query/parseResponseData.ts";

export default function useAuthLoginSubmitMutation({form}: {form: UseFormReturn<UserLoginData>}) {
    const navigate = useNavigate();

    const submitLoginData = async (data: UserLoginData) => {
        const action = () => AuthRepository.login(data);
        const schema = AuthUserDetailsSchema;

        const {result} = await useFetchErrorHandler({fetchQueryFn: action});
        return parseResponseData({schema, data: result});
    }

    const onSuccess = (authUser: AuthUserDetails) => {
        toast.success("Logged in.");
        localStorage.setItem("authUser", JSON.stringify(authUser));

        const path = sessionStorage.getItem("redirectPath");
        path && sessionStorage.removeItem("redirectPath");

        navigate(path || "/");
    }

    const onError = (error: Error) => {
        if (error instanceof FetchError) {
            for (let validationError of error.errors) {
                console.log(validationError);
                const {path, message} = validationError;
                form.setError(path.join(".") as any, {type: "manual", message});
            }
        }
    }

    return useMutation({
        mutationKey: ['submit_login_data'],
        mutationFn: submitLoginData,
        onSuccess,
        onError,
    });
}