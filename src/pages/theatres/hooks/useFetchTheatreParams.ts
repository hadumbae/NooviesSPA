import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

export default function useFetchTheatreParams() {
    const navigate = useNavigate();
    const {theatreID} = useParams<{theatreID: string}>();

    if (!theatreID) {
        toast.error("Invalid Theatre ID.");
        navigate("/admin/theatres");
    }

    return {
        theatreID,
    };
}