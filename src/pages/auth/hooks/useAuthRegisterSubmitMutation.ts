import {useMutation} from "@tanstack/react-query";
import {UserRegisterData} from "@/pages/auth/schema/AuthRegisterSchema.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import AuthRepository from "@/pages/auth/repositories/AuthRepository.ts";
import {Path, UseFormReturn} from "react-hook-form";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import ValidationService from "@/common/services/validation/ValidationService.ts";
import {ParseError} from "@/common/errors/ParseError.ts";

export default function useAuthRegisterSubmitMutation({form}: { form: UseFormReturn<UserRegisterData> }) {
    const navigate = useNavigate();

    const submitRegisterData = async (data: UserRegisterData) => {
        const {response, result} = await AuthRepository.register(data);

        if (response.status === 200) {
            return result;
        }

        if (response.status === 400) {
            return ValidationService.validateFormErrorResponse({
                errorData: result,
                errorResponse: response
            });
        }

        const {message = "Error, failed to register. Please try again."} = result;
        throw new HttpResponseError({response, message});
    }

    const onSuccess = async () => {
        toast.success("Registered successfully. Proceed to login.");
        navigate("/auth/login");
    };

    const onError = (error: Error) => {
        if (error instanceof ParseError) {
            for (let validationError of error.errors) {
                const {path, message} = validationError;
                form.setError(path.join(".") as Path<UserRegisterData>, {type: "manual", message});
            }
        }
    }

    return useMutation({
        mutationKey: ['submit_register_data'],
        mutationFn: submitRegisterData,
        onSuccess,
        onError,
    });
}