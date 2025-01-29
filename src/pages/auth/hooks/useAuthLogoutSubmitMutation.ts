import AuthService from "@/pages/auth/service/AuthService.ts";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";

interface Params {
    onLogout?: () => void;
}

export default function useAuthLogoutSubmitMutation(params?: Params) {
    const {onLogout} = params || {};

    const mutationKey = ["submit_logout"];

    const logout = async () => {
        await AuthService.logout();
    }

    const onSuccess = () => {
        toast.success("Logged out!");
        onLogout && onLogout();
    };

    const onError = (error: Error) => {
        const {message = "Oops. Something went wrong. Please try again."} = error;
        toast.error(message);
    };

    return useMutation({
        mutationKey,
        mutationFn: logout,
        onSuccess,
        onError,
    });
}