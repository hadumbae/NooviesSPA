import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/query/useFetchAPI.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

interface IShowingSeatRepository {
    baseURL: string;
    fetchSeatsForShowing(params: {showingID: ObjectId, populate?: boolean, mapped?: boolean}): Promise<FetchReturns>;
}

const ShowingSeatRepository: IShowingSeatRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/showings`,

    async fetchSeatsForShowing(
        params: { showingID: ObjectId, populate?: boolean, mapped?: boolean }
    ): Promise<FetchReturns> {
        const {showingID, populate = false, mapped = false} = params;

        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: `/get/${showingID}/seats`,
            queries: {populate, mapped},
        });

        return useFetchAPI({url, method: "GET"});
    }
}

export default ShowingSeatRepository;