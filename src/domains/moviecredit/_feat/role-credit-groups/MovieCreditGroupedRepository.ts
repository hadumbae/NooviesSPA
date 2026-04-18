import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";

/**
 * Parameters for grouped movie credit queries by person.
 */
type GroupedForPersonParams = {
    /** Target person ObjectId */
    personID: ObjectId;

    /** Optional request configuration */
    config?: RequestOptions;
};

/**
 * Repository contract for grouped movie credit queries.
 */
type MovieCreditGroupedRepository = {
    /** Base API endpoint for movie credit operations */
    baseURL: string;

    /**
     * Fetch movie credits grouped by role type for a person.
     *
     * @param params - Person ID and request configuration
     * @returns Standardized API response wrapper
     */
    getGroupedByRoleForPerson(
        params: GroupedForPersonParams
    ): Promise<RequestReturns>;
};

/**
 * Movie credit grouped query repository.
 */
const repository: MovieCreditGroupedRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/movie/credits`,

    async getGroupedByRoleForPerson(
        params: GroupedForPersonParams
    ): Promise<RequestReturns> {
        const {personID, config} = params;

        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: `query/person/${personID}/grouped-by-role-type`,
            queries: config,
        });

        return useFetchAPI({url, method: "GET"});
    },
};

export default repository;
