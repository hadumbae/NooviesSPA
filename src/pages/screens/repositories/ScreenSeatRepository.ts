import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {SeatsByRow} from "@/pages/screens/schema/screen/ScreenSeat.types.ts";

interface IScreenSeatRepository {
    _baseURL: string;

    fetchSeatsByRow<TResult = SeatsByRow>(params: FetchByIDParams): Promise<RequestReturns<TResult>>
}

const screenSeatRepository: IScreenSeatRepository = {
    _baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/screens`,

    fetchSeatsByRow<TResult = SeatsByRow>({_id, ...queries}: FetchByIDParams): Promise<RequestReturns<TResult>> {
        const url = buildQueryURL({baseURL: this._baseURL, path: `get/${_id}/seats/by-row`, queries});
        return useFetchAPI({method: "GET", url});
    }
};

export default screenSeatRepository;