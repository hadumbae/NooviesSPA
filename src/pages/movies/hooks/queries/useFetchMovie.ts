import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {useQuery} from "@tanstack/react-query";
import throwResponseError from "@/common/utility/errors/throwResponseError.ts";

/**
 * Parameters for fetching a single movie.
 */
interface FetchParams {
    /**
     * The unique ID of the movie to fetch.
     */
    _id: ObjectId;

    /**
     * Whether to populate referenced fields (e.g., genres, cast).
     * Defaults to false.
     */
    populate?: boolean;

    /**
     * Whether to include virtual fields in the response.
     * Defaults to false.
     */
    virtuals?: boolean;
}

/**
 * React Query hook to fetch a single movie by its ID.
 *
 * @param params - Parameters to specify which movie to fetch and how to structure the returned data.
 * @returns The result of the query, including loading state, data, and error (if any).
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useFetchMovie({
 *   _id: "abc123",
 *   populate: true,
 *   virtuals: false
 * });
 * ```
 */
export default function useFetchMovie(params: FetchParams) {
    const {_id, populate = false, virtuals = false} = params;

    const queryKey = ["fetch_single_movie", {_id, populate, virtuals}];

    const action = async () => {
        const {response, result} = await MovieRepository.get({_id, populate});

        if (!response.ok) {
            const message = "Failed to fetch movie. Please try again.";
            throwResponseError({response, result, message});
        }

        return result;
    }

    return useQuery({queryKey, queryFn: action});
}