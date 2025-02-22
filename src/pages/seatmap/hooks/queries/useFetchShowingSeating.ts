import useFetchSchemaData from "@/common/hooks/validation/useFetchSchemaData.ts";
import SeatMapShowingRepository from "@/pages/seatmap/repositories/SeatMapShowingRepository.ts";

import SeatMapFilters from "@/pages/seatmap/types/SeatMapFilters.ts";
import {PaginatedSeatMaps, PaginatedSeatMapSchema} from "@/pages/seatmap/schema/SeatMapPaginationSchema.ts";


interface Params {
    showingID: string;
    page?: number;
    perPage?: number;
    filters?: SeatMapFilters;
}

export default function useFetchShowingSeating(params: Params) {
    const {showingID, page = 1, perPage = 50, filters = {}} = params;

    const queryKey = "fetch_showing_seating";
    const schema = PaginatedSeatMapSchema;
    const action = () => SeatMapShowingRepository.fetchShowingSeatMap({showingID, page, perPage, filters});

    return useFetchSchemaData<typeof schema, PaginatedSeatMaps>({
        queryKey,
        schema,
        action,
    });
}