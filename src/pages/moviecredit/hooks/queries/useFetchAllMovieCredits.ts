import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import {useQuery} from "@tanstack/react-query";
import throwResponseError from "@/common/utility/errors/throwResponseError.ts";

/**
 * Props for fetching all movie credits.
 */
interface fetchProps {
    /** Optional filters to narrow the movie credit results. */
    filters?: QueryFilters;

    /** Whether to populate related data in the response. Defaults to false. */
    populate?: boolean;
}

/**
 * React hook to fetch and validate all movie credits matching given filters.
 *
 * This hook fetches all movie credits from the repository using
 * {@link MovieCreditRepository.getAll}, and validates the response using
 * {@link MovieCreditArraySchema}. Redirects if validation fails.
 *
 * It does not apply pagination; it retrieves all data at once.
 *
 * @param param0 - Options including filters and populate flag.
 * @returns A query result containing a validated array of movie credits.
 */
export default function useFetchAllMovieCredits({populate = false, filters = {}}: fetchProps) {
    const queryKey = ["fetch_all_movie_credits", {populate, filters}];
    const action = async () => {
        const {response, result} = await MovieCreditRepository.getAll({filters, populate});

        if (!response.ok) {
            const message = "Failed to fetch movie credits. Please try again.";
            throwResponseError({response, result, message});
        }

        return result;
    }

    return useQuery({queryKey, queryFn: action});
}