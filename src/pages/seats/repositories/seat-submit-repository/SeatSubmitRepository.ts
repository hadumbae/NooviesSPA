import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {
    ISeatSubmitRepository,
    SubmitSeatsByRowParams
} from "@/pages/seats/repositories/seat-submit-repository/SeatSubmitRepository.types.ts";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/query/useFetchAPI.ts";

const repository: ISeatSubmitRepository = {
    _baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/seats`,

    submitSeatsByRow<TReturns = Seat[]>(params: SubmitSeatsByRowParams): Promise<RequestReturns<TReturns>> {
        const {data, ...options} = params;
        const url = buildQueryURL({baseURL: this._baseURL, path: "create/by-row", queries: options});
        return useFetchAPI({url, data, method: "POST"});
    }
};

export default repository;