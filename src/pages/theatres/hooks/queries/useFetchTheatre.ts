import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {useQuery} from "@tanstack/react-query";
import useQueryFnHandler from "@/common/utility/query/useQueryFnHandler.ts";
import {FetchByIDParams} from "@/common/type/query/FetchByIDParams.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

/**
 * React Query hook to fetch detailed theatre data by ID.
 *
 * Uses `react-query` to manage the fetch state, caching, and background updates
 * for a single theatre's full detail, including optional population and virtuals.
 *
 * @param _id - The unique string ID of the theatre to fetch.
 * @param requestOptions - Optional flags and parameters to control the response shape:
 * - `populate`: Whether to populate referenced documents (e.g., seats, screens).
 * - `virtuals`: Whether to include virtual properties in the response.
 * - `limit`: Optional limit on number of records (not commonly used for single fetch).
 *
 * @returns A React Query result object with the theatre data, loading status, error, etc.
 *
 * @example
 * ```ts
 * const { data, isLoading } = useFetchTheatre({
 *   _id: "64abc123ef5678...",
 *   populate: true,
 *   virtuals: true
 * });
 * ```
 */
export default function useFetchTheatre({_id, ...requestOptions}: FetchByIDParams) {
    const queryKey = ["fetch_single_theatre", {_id, ...requestOptions}];

    const action = useQueryFnHandler<TheatreDetails>({
        action: () => TheatreRepository.get({_id, ...requestOptions}),
        errorMessage: "Failed to fetch theatre data. Please try again.",
    });

    return useQuery({
        queryKey,
        queryFn: action,
    });
}