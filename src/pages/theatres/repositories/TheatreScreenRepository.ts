import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/query/useFetchAPI.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

interface IFetchTheatreScreensParams {
    theatreID: ObjectId;
    queries?: Record<string, any>;
}

export interface ITheatreScreenRepository {
    baseURL: string;
    fetchTheatreScreens(params: IFetchTheatreScreensParams): Promise<RequestReturns>;
}

export const TheatreScreenRepository: ITheatreScreenRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/theatres`,

    fetchTheatreScreens({theatreID, queries}: IFetchTheatreScreensParams): Promise<RequestReturns> {
        const url = buildQueryURL({baseURL: this.baseURL, path: `get/${theatreID}/screens`, queries});
        return useFetchAPI({url, method: "GET"});
    }
}

