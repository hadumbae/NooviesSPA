import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

interface ParamReturns {
    showingID: ObjectId;
    seatMapID: ObjectId;
}

export default function useFetchShowingSeatMapParams(): ParamReturns {
    const navigate = useLoggedNavigate();
    const {showingID, seatMapID} = useParams<{ showingID: ObjectId, seatMapID: ObjectId }>();

    if (!showingID || !seatMapID) {
        toast.error("Invalid SeatMap");
        
        navigate({
            level: "warn",
            to: "/admin/showings",
            component: useFetchShowingSeatMapParams.name,
            message: "Failed to fetch both showing ID and seat map ID.",
        });

        throw new Error("Invalid Seat Map Params.");
    }

    return {
        showingID,
        seatMapID,
    };
}