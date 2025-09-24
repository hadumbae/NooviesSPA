import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import useLoggedNavigate from "@/common/hooks/useLoggedNavigate.ts";

export default function useFetchScreenParams() {
    const navigate = useLoggedNavigate();
    const {screenID} = useParams<{screenID: string}>();

    if (!screenID) {
        toast.error("Invalid Screen ID.");
        navigate({
            level: "warn",
            to: "/admin/screens",
            component: useFetchScreenParams.name,
            message: "Failed to fetch screen ID. ID is either missing or is invalid.",
        });
    }

    return {
        screenID,
    };
}