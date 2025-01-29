import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/query/useFetchAPI.ts";
import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import FetchReturns from "@/common/type/fetch/FetchReturns.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import filterNullAttributes from "@/common/utility/filterNullAttributes.ts";

type PaginatedFilters = { page: number, perPage: number } & QueryFilters;

export interface IRequestRepository {
    getAll(params?: { filters?: QueryFilters, populate?: boolean }): Promise<FetchReturns>;

    get(params: { _id: string, populate?: boolean }): Promise<FetchReturns>;

    paginated(params: { filters: PaginatedFilters, populate?: boolean }): Promise<FetchReturns>;

    create(params: { data: Record<string, any>, populate?: boolean }): Promise<FetchReturns>;

    update(params: { _id: ObjectId, data: Record<string, any>, populate?: boolean }): Promise<FetchReturns>;

    delete(params: { _id: ObjectId }): Promise<FetchReturns>;
}

export const createBaseRequestRepository = ({baseURL}: { baseURL: string }): IRequestRepository => ({
    async getAll(params?: { filters?: QueryFilters, populate?: boolean }): Promise<FetchReturns> {
        const {filters = {}, populate} = params || {};
        const queries = filterNullAttributes({...filters, populate});

        const url = buildQueryURL({baseURL: baseURL, path: "all", queries});
        return useFetchAPI({url, method: "GET"});
    },

    async paginated(params: { filters: PaginatedFilters, populate?: boolean }) {
        const {filters, populate} = params;
        const queries = filterNullAttributes({...filters, populate});

        const url = buildQueryURL({baseURL: baseURL, path: "paginated", queries});
        return useFetchAPI({url, method: "GET"});
    },

    async get(params: { _id: ObjectId, populate?: boolean }): Promise<FetchReturns> {
        const {_id, populate} = params;
        const queries = {...(populate !== undefined && {populate})};

        const url = buildQueryURL({baseURL: baseURL, path: `get/${_id}`, queries});
        return useFetchAPI({url, method: "GET"});
    },

    async create(params: { data: Record<string, any>, populate?: boolean }) {
        const {data, populate} = params;
        const queries = {...(populate !== undefined && {populate})};

        const url = buildQueryURL({baseURL: baseURL, path: "create", queries});
        return useFetchAPI({url: url, method: "POST", data});
    },

    async update(params: { _id: string, data: Record<string, any>, populate?: boolean }) {
        const {_id, data, populate = false} = params;
        const queries = {...(populate !== undefined && {populate})};

        const url = buildQueryURL({baseURL: baseURL, path: `update/${_id}`, queries});
        return useFetchAPI({url: url, method: "PATCH", data});
    },

    async delete({_id}: { _id: string }) {
        const url = buildQueryURL({baseURL: baseURL, path: `delete/${_id}`});
        return useFetchAPI({url: url, method: "DELETE"});
    },
})