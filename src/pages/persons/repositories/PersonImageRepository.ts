import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/query/useFetchAPI.ts";

type UploadProfileImageParams = RequestOptions & {
    personID: ObjectId;
    data: FormData;
};

type RemoveProfileImageParams = RequestOptions & {
    personID: ObjectId;
};

export interface IPersonImageRepository {
    baseURL: string;
    uploadProfileImage: (params: UploadProfileImageParams) => Promise<FetchReturns>;
    removeProfileImage: (params: RemoveProfileImageParams) => Promise<FetchReturns>;
}

export const PersonImageRepository: IPersonImageRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/persons`,

    uploadProfileImage(params: UploadProfileImageParams): Promise<FetchReturns> {
        const {personID, data, ...options} = params;

        const path = `update/${personID}/images/profile`;
        const url = buildQueryURL({baseURL: this.baseURL, path, queries: {...options}});

        return useFetchAPI({url, method: "PATCH", data});
    },

    removeProfileImage(params: RemoveProfileImageParams): Promise<FetchReturns> {
        const {personID, ...options} = params;

    const path = `delete/${personID}/images/profile`;
        const url = buildQueryURL({baseURL: this.baseURL, path, queries: {...options}});

        return useFetchAPI({url, method: "DELETE"});
    }
}