import {useNavigate, useParams} from "react-router-dom";
import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {toast} from "react-toastify";

interface ParamReturns {
    seatMapID: ObjectId;
}

export default function useFetchSeatMapParams(): ParamReturns {
    const navigate = useNavigate();
    const {seatMapID} = useParams<{seatMapID: ObjectId}>();

    if (!seatMapID) {
        toast.error("Invalid SeatMap");
        navigate("/admin/showings");

        throw new Error("Invalid Seat Map Params.");
    }

    return {
        seatMapID,
    };
}