import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import AuthRepository from "@/pages/auth/repositories/AuthRepository.ts";
import handleFetchError from "@/common/handlers/query/handleFetchError.ts";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";

interface Params {
    onLogout?: () => void;
}

export default function useAuthLogoutSubmitMutation(params?: Params) {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const {onLogout} = params || {};

    const mutationKey = ["submit_logout"];

    const logout = async () => {
        const action = () => AuthRepository.logout();
        await handleFetchError({fetchQueryFn: action});
    }

    const onSuccess = () => {
        localStorage.removeItem("authUser");
        sessionStorage.removeItem("redirectPath");

        if (authContext) {
            authContext.setUser(null);
            authContext.setLogout(true);
        }

        toast.success("Logged out!");
        navigate("/");
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