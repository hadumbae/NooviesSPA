import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useFetchMovieBrowseParams from "@/pages/movies/hooks/params/client/useFetchMovieBrowseParams.ts";

interface ParamReturns {
    seatMapID: ObjectId;
}

export default function useFetchSeatMapParams(): ParamReturns {
    const navigate = useLoggedNavigate();
    const {seatMapID} = useParams<{seatMapID: ObjectId}>();

    if (!seatMapID) {
        toast.error("Invalid SeatMap");
        navigate({
            level: "warn",
            to: "/admin/showings",
            component: useFetchMovieBrowseParams.name,
            message: "Failed to fetch seat map ID. ID is either missing or invalid.",
        });

        throw new Error("Invalid Seat Map Params.");
    }

    return {
        seatMapID,
    };
}