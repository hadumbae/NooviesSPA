import useFetchShowing from "@/pages/showings/hooks/queries/useFetchShowing.ts";
import useFetchSeatMap from "@/pages/seatmap/hooks/queries/useFetchSeatMap.ts";

interface Params {
    showingID: string;
    seatMapID: string;
    populate?: boolean;
}

export default function useFetchShowingAndSeatMap(params: Params) {
    const { showingID, seatMapID, populate } = params;

    const showingQuery = useFetchShowing({_id: showingID, populate});
    const seatMapQuery = useFetchSeatMap({_id: seatMapID, populate});

    const isPending = showingQuery.isPending || seatMapQuery.isPending;
    const isError = showingQuery.isError || seatMapQuery.isError;
    const error = showingQuery.error || seatMapQuery.error;

    return {
        showing: showingQuery.data,
        seatMap: seatMapQuery.data,
        isPending,
        isError,
        error,
    }
}