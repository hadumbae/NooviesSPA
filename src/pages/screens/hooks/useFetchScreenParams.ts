import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

export default function useFetchScreenParams() {
    const navigate = useNavigate();
    const {screenID} = useParams<{screenID: string}>();

    if (!screenID) {
        toast.error("Invalid Screen ID.");
        navigate("/admin/screens");
    }

    return {
        screenID,
    };
}