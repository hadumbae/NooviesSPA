import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

interface ParamReturns {
    showingID: ObjectId;
    seatMapID: ObjectId;
}

export default function useFetchShowingSeatMapParams(): ParamReturns {
    const navigate = useNavigate();
    const {showingID, seatMapID} = useParams<{showingID: ObjectId, seatMapID: ObjectId}>();

    if (!showingID || !seatMapID) {
        toast.error("Invalid SeatMap");
        navigate("/admin/showings");

        throw new Error("Invalid Seat Map Params.");
    }

    return {
        showingID,
        seatMapID,
    };
}