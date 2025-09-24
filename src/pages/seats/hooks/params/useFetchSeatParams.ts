import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import useLoggedNavigate from "@/common/hooks/useLoggedNavigate.ts";
import useFetchSeatMapParams from "@/pages/seatmap/hooks/params/useFetchSeatMapParams.ts";

export default function useFetchSeatParams() {
    const navigate = useLoggedNavigate();
    const {seatID} = useParams<{seatID: string}>();

    if (!seatID) {
        toast.error("Invalid Seat ID.");
        navigate({
            level: "warn",
            to: "/admin/seats",
            component: useFetchSeatMapParams.name,
            message: "Failed to fetch seat ID. ID is either missing or invalid.",
        });
    }

    return {
        seatID,
    };
}