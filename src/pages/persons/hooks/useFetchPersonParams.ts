import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

export default function useFetchPersonParams() {
    const navigate = useNavigate();
    const { personID } = useParams<{personID: string}>();

    if (!personID) {
        toast.error("Invalid Person ID.");
        navigate(`/admin/persons`);
    }

    return {
        personID,
    };
}