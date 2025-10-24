import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";

/**
 * Parameters for fetching movie credits grouped by role for a person.
 */
type GroupedForPersonParams = RequestOptions & {
    /** Unique identifier of the person whose credits are requested */
    personID: ObjectId
};

/**
 * Repository contract for fetching movie credit data grouped by role type
 * for a specific person.
 */
type MovieCreditGroupedRepository = {
    /**
     * Base URL for the movie credit API.
     * Example: `${import.meta.env.VITE_API_URL}/api/v1/admin/movie/credits`
     */
    baseURL: string;

    /**
     * Fetches movie credits for a given person, grouped by their role type
     * (e.g., Actor, Director, Writer).
     *
     * Supports optional query parameters via {@link RequestOptions}, such as `limit`.
     *
     * @param params - Query parameters
     * @param params.personID - Unique identifier of the person
     * @param params.limit - Optional limit for the number of results returned
     * @returns A promise that resolves with a standardized fetch response wrapper
     */
    getGroupedByRoleForPerson(params: GroupedForPersonParams): Promise<RequestReturns>;
};

/**
 * Concrete implementation of {@link MovieCreditGroupedRepository}.
 * Provides methods for querying the backend API for grouped movie credits.
 */
const repository: MovieCreditGroupedRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/movie/credits`,

    async getGroupedByRoleForPerson(params: GroupedForPersonParams): Promise<RequestReturns> {
        const {personID, limit} = params;

        // Filter out empty or undefined query attributes
        const queries = filterNullishAttributes({limit});

        // Build the API endpoint URL with the given person ID and query parameters
        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: `query/person/${personID}/grouped-by-role-type`,
            queries,
        });

        // Perform the GET request to the API
        return useFetchAPI({url, method: "GET"});
    }
};

export default repository;
