import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

export default function useFetchSeatParams() {
    const navigate = useNavigate();
    const {seatID} = useParams<{seatID: string}>();

    if (!seatID) {
        toast.error("Invalid Seat ID.");
        navigate("/admin/seats");
    }

    return {
        seatID,
    };
}