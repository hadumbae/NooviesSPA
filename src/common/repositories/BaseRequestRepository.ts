import buildQueryURL from "@/common/utility/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/useFetchAPI.ts";
import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";

export interface IRequestRepository {
    getAll(params: { queries: QueryFilters }): Promise<FetchReturns>;

    get(params: { _id: string }): Promise<FetchReturns>;

    paginated(params: { queries: QueryFilters }): Promise<FetchReturns>;

    create(params: { data: Record<string, any> }): Promise<FetchReturns>;

    update(params: { _id: ObjectId, data: Record<string, any> }): Promise<FetchReturns>;

    delete(params: { _id: ObjectId }): Promise<FetchReturns>;
}

export const createBaseRequestRepository = ({baseURL}: { baseURL: string }): IRequestRepository => ({
    async getAll({queries = {}}: { queries: Record<string, any> }): Promise<FetchReturns> {
        const url = buildQueryURL({baseURL: baseURL, path: "all", queries});
        return useFetchAPI({url, method: "GET"});
    },

    async paginated({queries}: { queries: Record<string, any> }) {
        const url = buildQueryURL({baseURL: baseURL, path: "paginated", queries});
        return useFetchAPI({url, method: "GET"});
    },

    async get({_id}: { _id: ObjectId }): Promise<FetchReturns> {
        const url = buildQueryURL({baseURL: baseURL, path: `get/${_id}`});
        return useFetchAPI({url, method: "GET"});
    },

    async create({data}: { data: Record<string, any> }) {
        const url = buildQueryURL({baseURL: baseURL, path: "create"});
        return useFetchAPI({url: url, method: "POST", data});
    },

    async update({_id, data}: { _id: string, data: Record<string, any>, authToken: string }) {
        const url = buildQueryURL({baseURL: baseURL, path: `update/${_id}`});
        return useFetchAPI({url: url, method: "PATCH", data});
    },

    async delete({_id}: { _id: string }) {
        const url = buildQueryURL({baseURL: baseURL, path: `delete/${_id}`});
        return useFetchAPI({url: url, method: "DELETE"});
    },
})