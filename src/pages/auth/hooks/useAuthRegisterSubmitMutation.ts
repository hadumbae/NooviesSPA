import {useMutation} from "@tanstack/react-query";
import {UserRegisterData} from "@/pages/auth/schema/AuthRegisterSchema.ts";
import AuthService from "@/pages/auth/service/AuthService.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function useAuthRegisterSubmitMutation() {
    const navigate = useNavigate();

    const submitRegisterData = async (data: UserRegisterData) => {
        await AuthService.register(data);
    }

    const onSuccess = async () => {
        toast.success("Registered successfully. Proceed to login.");
        navigate("/auth/login");
    };

    const onError = (error: Error) => {
        console.error(error);
    }

    return useMutation({
        mutationKey: ['submit_register_data'],
        mutationFn: submitRegisterData,
        onSuccess,
        onError,
    });
}