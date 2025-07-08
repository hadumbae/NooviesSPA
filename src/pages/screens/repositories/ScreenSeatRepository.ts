import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/query/useFetchAPI.ts";
import {SeatsByRow} from "@/pages/screens/schema/screen/ScreenSeat.types.ts";

interface IScreenSeatRepository {
    _baseURL: string;

    fetchSeatsByRow<TResult = SeatsByRow>(params: FetchByIDParams): Promise<FetchReturns<TResult>>
}

const screenSeatRepository: IScreenSeatRepository = {
    _baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/screens`,

    fetchSeatsByRow<TResult = SeatsByRow>({_id, ...queries}: FetchByIDParams): Promise<FetchReturns<TResult>> {
        const url = buildQueryURL({baseURL: this._baseURL, path: `get/${_id}/seats/by-row`, queries});
        return useFetchAPI({method: "GET", url});
    }
};

export default screenSeatRepository;