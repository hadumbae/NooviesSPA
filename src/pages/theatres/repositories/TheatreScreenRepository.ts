import RequestReturns from "@/common/type/request/RequestReturns.ts";
import buildQueryURL from "@/common/utility/query/buildQueryURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import { ObjectId } from "@/common/schema/strings/IDStringSchema.ts";

/**
 * Parameters for fetching theatre screens.
 *
 * @property theatreID - The unique identifier of the theatre.
 * @property queries - Optional query parameters for filtering, pagination, or populating virtual fields.
 */
export type FetchTheatreScreensParams = {
    theatreID: ObjectId;
    queries?: Record<string, any>;
}

/**
 * Repository interface for performing theatre screen-related API requests.
 *
 * Provides typed access to the `/api/v1/admin/theatres` endpoint, with
 * methods for fetching screens and handling query parameters.
 *
 * @property baseURL - The base API endpoint for theatre administration.
 * @method fetchTheatreScreens - Fetches all screens associated with a specific theatre.
 */
export type TheatreScreenRepository = {
    /** Base API endpoint for theatre resources. */
    baseURL: string;

    /**
     * Fetches all screens belonging to a specific theatre.
     *
     * @param params - Parameters for fetching screens.
     * @param params.theatreID - The unique ID of the theatre.
     * @param params.queries - Optional query parameters to customize the request.
     * @returns A promise resolving to a {@link RequestReturns} object containing the fetched screens.
     */
    fetchTheatreScreens(params: FetchTheatreScreensParams): Promise<RequestReturns>;
}

/**
 * **Default repository instance for theatre screens**.
 *
 * This constant is a ready-to-use instance of {@link TheatreScreenRepository}.
 * It contains the `baseURL` and implements `fetchTheatreScreens` for fetching
 * screens by theatre ID with optional query parameters.
 *
 * ### Example
 * ```ts
 * import { TheatreScreenRepository } from "@/pages/theatres/repositories/TheatreScreenRepository";
 *
 * // Fetch all screens for a theatre
 * const result = await TheatreScreenRepository.fetchTheatreScreens({
 *   theatreID: "66b9d1b8c35f2a0012cd90f0",
 *   queries: { populate: true }
 * });
 *
 * console.log(result.data);
 * ```
 *
 * @see {@link TheatreScreenRepository}
 * @see {@link useFetchAPI}
 * @see {@link buildQueryURL}
 */
export const TheatreScreenRepository: TheatreScreenRepository = {
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/admin/theatres`,

    fetchTheatreScreens({ theatreID, queries }: FetchTheatreScreensParams): Promise<RequestReturns> {
        const url = buildQueryURL({
            baseURL: this.baseURL,
            path: `get/${theatreID}/screens`,
            queries
        });
        return useFetchAPI({ url, method: "GET" });
    }
}
