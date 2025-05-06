import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import SeatMapShowingRepository from "@/pages/seatmap/repositories/SeatMapShowingRepository.ts";

import SeatMapFilters from "@/pages/seatmap/types/SeatMapFilters.ts";
import {PaginatedSeatMaps, PaginatedSeatMapSchema} from "@/pages/seatmap/schema/SeatMapPaginationSchema.ts";
import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";


interface Params {
    /**
     * The ID of the showing to fetch seating data for
     */
    showingID: string;

    /**
     * The page number to retrieve.
     */
    page?: number;

    /**
     * The number of items per page.
     */
    perPage?: number;

    /**
     * Optional filters to apply to the seating data.
     */
    filters?: SeatMapFilters;
}

/**
 * Custom hook to fetch paginated seating data for a specific showing.
 *
 * @param params - The parameters for fetching the seating data.
 * @param params.showingID - The ID of the showing to fetch seating data for.
 * @param [params.page=1] - The page number to retrieve (default is 1).
 * @param [params.perPage=50] - The number of items per page (default is 50).
 * @param [params.filters={}] - Optional filters to apply to the seating data.
 *
 * @returns An object containing the paginated seating data and related metadata.
 */
export default function useFetchPaginatedShowingSeating(params: Params) {
    const {showingID, page = 1, perPage = 50, filters = {}} = params;
    const filteredQueries = filterEmptyAttributes(filters)

    const queryKey = ["fetch_showing_seating", {showingID, page, perPage, filters: filteredQueries}];
    const schema = PaginatedSeatMapSchema;
    const action = () => SeatMapShowingRepository.fetchShowingSeatMap({
        showingID,
        page,
        perPage,
        filters: filteredQueries
    });

    return useFetchValidatedDataWithRedirect<typeof schema, PaginatedSeatMaps>({queryKey, schema, action});
}