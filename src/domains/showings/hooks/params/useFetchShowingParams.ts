import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

export default function useFetchShowingParams() {
    const navigate = useNavigate();
    const {showingID} = useParams<{showingID: string}>();

    if (!showingID) {
        toast.error("Invalid Showing ID.");
        navigate("/admin/showings");
        throw new Error("Invalid Showing ID.");
    }

    return {
        showingID,
    };
}