import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/query/useFetchAPI.ts";
import SeatMapFilters from "@/pages/seatmap/types/SeatMapFilters.ts";

interface ShowingSeatMapParams {
    showingID: string;
    page: number;
    perPage: number;
    filters?: SeatMapFilters;
    populate?: boolean;
}

export interface IShowingSeatMapRepository {
    baseURL: string;

    createSeatMap(params: { showingID: string }): Promise<RequestReturns>;

    toggleSeatMapAvailability(params: { seatMapID: string }): Promise<RequestReturns>;

    fetchShowingSeatMap(params: ShowingSeatMapParams): Promise<RequestReturns>;
}

const SeatMapShowingRepository: IShowingSeatMapRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/seatmaps`,

    async createSeatMap({showingID}: { showingID: string }): Promise<RequestReturns> {
        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: `showing/${showingID}/seating/create`,
        });

        return useFetchAPI({url, method: "POST"});
    },

    async toggleSeatMapAvailability({seatMapID}: { seatMapID: string }): Promise<RequestReturns> {
        const url = buildQueryURL({
                baseURL: this.baseURL,
                path: `update/${seatMapID}/toggle/availability`
            },
        );

        return useFetchAPI({url, method: "PATCH"});
    },

    async fetchShowingSeatMap(params: ShowingSeatMapParams): Promise<RequestReturns> {
        const {showingID, page, perPage, filters = {}, populate = false} = params;

        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: `showing/${showingID}/seating/get`,
            queries: {page, perPage, populate, ...filters},
        });

        return useFetchAPI({url, method: "GET"});
    },
}

export default SeatMapShowingRepository;