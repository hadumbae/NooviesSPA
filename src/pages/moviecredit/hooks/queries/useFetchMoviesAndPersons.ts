import useFetchAllMovies from "@/pages/movies/hooks/queries/useFetchAllMovies.ts";
import useFetchAllPersons from "@/pages/persons/hooks/useFetchAllPersons.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import useValidateData from "@/common/hooks/validation/useValidateData.ts";
import {MovieArraySchema} from "@/pages/movies/schema/model/MovieArraySchema.ts";
import {PersonArraySchema} from "@/pages/persons/schema/PersonArraySchema.ts";

/**
 * Parameters for fetching and validating movie and person data.
 */
interface FetchParams {
    /** Optional flag to populate related fields in the response. */
    populate?: boolean;

    /** Optional flag to include virtual fields in the response. */
    virtuals?: boolean;

    /** Optional query filters to apply when fetching movies. */
    movieFilters?: QueryFilters;

    /** Optional query filters to apply when fetching persons. */
    personFilters?: QueryFilters
}

/**
 * React hook to fetch and validate both movie and person data concurrently.
 *
 * - Uses `useFetchAllMovies` and `useFetchAllPersons` to query data.
 * - Applies validation using `useValidateData` and corresponding schemas.
 * - Aggregates loading, error, and validation states into a single object.
 *
 * @param params - Configuration options for filters and data enrichment.
 * @returns An object containing:
 * - `data`: Validated movie and person arrays.
 * - `isPending`: True if any request is still loading.
 * - `isError`: True if any request failed.
 * - `queryError`: Error object from the first failed query, if any.
 * - `parseError`: Schema validation error from either dataset, if any.
 */
export default function useFetchMoviesAndPersons(params: FetchParams) {
    const {
        movieFilters,
        personFilters,
        populate,
        virtuals,
    } = params;

    const movieQuery = useFetchAllMovies({populate, virtuals, filters: movieFilters});
    const personQuery = useFetchAllPersons({populate, virtuals, filters: personFilters});
    const queries = [movieQuery, personQuery];

    const isPending = queries.some(({isPending}) => isPending);
    const isError = queries.some(({isError}) => isError);
    const queryError = queries.find(({isError}) => isError)?.error ?? null;

    const movieValidation = useValidateData({isPending, schema: MovieArraySchema, data: movieQuery.data});
    const personValidation = useValidateData({isPending, schema: PersonArraySchema, data: personQuery.data});

    const parseError = movieValidation.error ?? personValidation.error ?? null;

    return {
        data: {movie: movieValidation.data, person: personValidation.data},
        isPending,
        isError,
        queryError,
        parseError,
    };
}