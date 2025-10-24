import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";

type UploadProfileImageParams = RequestOptions & {
    personID: ObjectId;
    data: FormData;
};

type RemoveProfileImageParams = RequestOptions & {
    personID: ObjectId;
};

export interface IPersonImageRepository {
    baseURL: string;
    uploadProfileImage: (params: UploadProfileImageParams) => Promise<RequestReturns>;
    removeProfileImage: (params: RemoveProfileImageParams) => Promise<RequestReturns>;
}

export const PersonImageRepository: IPersonImageRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/persons`,

    uploadProfileImage(params: UploadProfileImageParams): Promise<RequestReturns> {
        const {personID, data, ...options} = params;

        const path = `update/${personID}/images/profile`;
        const url = buildQueryURL({baseURL: this.baseURL, path, queries: {...options}});

        return useFetchAPI({url, method: "PATCH", data});
    },

    removeProfileImage(params: RemoveProfileImageParams): Promise<RequestReturns> {
        const {personID, ...options} = params;

    const path = `delete/${personID}/images/profile`;
        const url = buildQueryURL({baseURL: this.baseURL, path, queries: {...options}});

        return useFetchAPI({url, method: "DELETE"});
    }
}