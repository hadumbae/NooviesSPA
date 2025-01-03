import {useMutation} from "@tanstack/react-query";
import {AuthUserDetails} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";
import {toast} from "react-toastify";
import AuthService from "@/pages/auth/service/AuthService.ts";
import {UserLoginData} from "@/pages/auth/schema/AuthLoginSchema.ts";
import {FetchError} from "@/common/type/error/FetchError.ts";
import {UseFormReturn} from "react-hook-form";
import {useNavigate} from "react-router-dom";

export default function useAuthLoginSubmitMutation({form}: {form: UseFormReturn<UserLoginData>}) {
    const navigate = useNavigate();

    const submitLoginData = async (data: UserLoginData) => {
        return await AuthService.login(data);
    }

    const onSuccess = (authUser: AuthUserDetails) => {
        toast.success("Logged in.");
        localStorage.setItem("authUser", JSON.stringify(authUser));
        navigate("/")
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