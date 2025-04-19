import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import AuthRepository from "@/pages/auth/repositories/AuthRepository.ts";
import handleFetchError from "@/common/handlers/query/handleFetchError.ts";
import {useNavigate} from "react-router-dom";

interface Params {
    onLogout?: () => void;
}

export default function useAuthLogoutSubmitMutation(params?: Params) {
    const {onLogout} = params || {};
    const navigate = useNavigate();

    const mutationKey = ["submit_logout"];

    const logout = async () => {
        const action = () => AuthRepository.logout();
        await handleFetchError({fetchQueryFn: action});
    }

    const onSuccess = () => {
        toast.success("Logged out!");

        localStorage.removeItem("authUser");
        sessionStorage.removeItem("redirectPath");

        navigate("/");
        window.location.reload();

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