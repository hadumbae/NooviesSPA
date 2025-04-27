import {useMutation} from "@tanstack/react-query";
import {AuthUserDetails, AuthUserDetailsSchema} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";
import {toast} from "react-toastify";
import {UserLoginData} from "@/pages/auth/schema/AuthLoginSchema.ts";
import {ParseError} from "@/common/errors/ParseError.ts";
import {Path, UseFormReturn} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import AuthRepository from "@/pages/auth/repositories/AuthRepository.ts";
import ValidationService from "@/common/services/validation/ValidationService.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {useContext} from "react";
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";

export default function useAuthLoginSubmitMutation({form}: { form: UseFormReturn<UserLoginData> }) {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const submitLoginData = async (data: UserLoginData) => {
        const {response, result} = await AuthRepository.login(data);

        if (response.status === 200) {
            const parsedResult = AuthUserDetailsSchema.safeParse(result);
            if (!parsedResult.success) throw new HttpResponseError({message: "Invalid Login API Response.", response});
            return parsedResult.data;
        }

        if (response.status === 400) {
            return ValidationService.validateFormErrorResponse({errorResponse: response, errorData: result});
        }

        throw new HttpResponseError({
            message: "Oops. Something went wrong trying to log in. Please try again.",
            response
        });
    }

    const onSuccess = (authUser: AuthUserDetails) => {
        toast.success("Logged in.");

        const path = sessionStorage.getItem("redirectPath");
        path && sessionStorage.removeItem("redirectPath");

        localStorage.setItem("authUser", JSON.stringify(authUser));
        if (authContext) {
            authContext.setUser(authUser);
            authContext.setLogout(false);
        }

        navigate(path || "/");
    }

    const onError = (error: Error) => {
        if (error instanceof ParseError) {
            for (let validationError of error.errors) {
                const {path, message} = validationError;
                form.setError(path.join(".") as Path<UserLoginData>, {type: "manual", message});
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