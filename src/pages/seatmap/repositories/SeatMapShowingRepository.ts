import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/query/useFetchAPI.ts";
import SeatMapFilters from "@/pages/seatmap/types/SeatMapFilters.ts";

export interface IShowingSeatMapRepository {
    baseURL: string;

    createSeatMap(params: {
        showingID: string
    }): Promise<FetchReturns>;

    fetchShowingSeatMap(params: {
        showingID: string,
        page: number,
        perPage: number,
        filters: SeatMapFilters
    }): Promise<FetchReturns>;

    toggleSeatMapAvailability(params: {
        seatMapID: string,
    }): Promise<FetchReturns>;
}

const SeatMapShowingRepository: IShowingSeatMapRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/seatmaps`,

    async createSeatMap(
        {showingID}: { showingID: string }
    ): Promise<FetchReturns> {
        const url = buildQueryURL({baseURL: this.baseURL, path: `showing/${showingID}/seating/create`})
        return useFetchAPI({url, method: "POST"})
    },

    async fetchShowingSeatMap(
        params: { showingID: string, page: number, perPage: number, filters: SeatMapFilters }
    ): Promise<FetchReturns> {
        const {showingID, page, perPage, filters} = params;

        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: `showing/${showingID}/seating/get`,
            queries: {page, perPage, ...filters},
        });

        return useFetchAPI({url, method: "GET"});
    },

    async toggleSeatMapAvailability(
        {seatMapID}: {seatMapID: string}
    ): Promise<FetchReturns> {
        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: `update/${seatMapID}/toggle/availability`},
        );

        return useFetchAPI({url, method: "PATCH"});
    }
}

export default SeatMapShowingRepository;