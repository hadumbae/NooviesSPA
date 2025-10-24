import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

interface IShowingSeatRepository {
    baseURL: string;
    fetchSeatsForShowing(params: {showingID: ObjectId, populate?: boolean, mapped?: boolean}): Promise<RequestReturns>;
}

const ShowingSeatRepository: IShowingSeatRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/showings`,

    async fetchSeatsForShowing(
        params: { showingID: ObjectId, populate?: boolean, mapped?: boolean }
    ): Promise<RequestReturns> {
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