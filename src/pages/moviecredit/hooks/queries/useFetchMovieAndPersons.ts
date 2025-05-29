import useFetchAllPersons from "@/pages/persons/hooks/useFetchAllPersons.ts";
import QueryFilters from "@/common/type/QueryFilters.ts";
import useValidateData from "@/common/hooks/validation/useValidateData.ts";
import {PersonArraySchema} from "@/pages/persons/schema/PersonArraySchema.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import {MovieSchema} from "@/pages/movies/schema/model/MovieSchema.ts";

/**
 * Parameters for fetching a specific movie and a list of persons.
 */
interface FetchParams {
    /** The unique identifier for the movie to fetch. */
    movieID: ObjectId;

    /** Whether to populate related documents in the fetched data. */
    populate?: boolean;

    /** Whether to include virtual fields in the fetched data. */
    virtuals?: boolean;

    /** Optional filters to apply when fetching persons. */
    personFilters?: QueryFilters;
}

/**
 * React hook to fetch a specific movie and a list of persons concurrently.
 *
 * - Fetches a movie by its ID using `useFetchMovie`.
 * - Fetches a filtered list of persons using `useFetchAllPersons`.
 * - Validates both responses using `zod` schemas via `useValidateData`.
 * - Consolidates loading, error, and validation states for use in components.
 *
 * @param params - Parameters controlling the fetch behavior for movie and persons.
 * @returns An object with:
 * - `data.movie`: The validated movie object.
 * - `data.persons`: The validated array of persons.
 * - `isPending`: Whether either request is still loading.
 * - `isError`: Whether either request has encountered an error.
 * - `queryError`: The error thrown by the first failed query, if any.
 * - `parseError`: A validation error from either dataset, if present.
 */
export default function useFetchMovieAndPersons(params: FetchParams) {
    const {
        movieID,
        personFilters = {},
        populate = false,
        virtuals = false,
    } = params;

    const movieQuery = useFetchMovie({_id: movieID, populate, virtuals});
    const personQuery = useFetchAllPersons({populate, virtuals, filters: personFilters});
    const queries = [movieQuery, personQuery];

    const isPending = queries.some(({isPending}) => isPending);
    const isError = queries.some(({isError}) => isError);
    const queryError = queries.find(({isError}) => isError)?.error ?? null;

    const movieValidation = useValidateData({isPending, schema: MovieSchema, data: movieQuery.data});
    const personValidation = useValidateData({isPending, schema: PersonArraySchema, data: personQuery.data});

    const parseError = movieValidation.error ?? personValidation.error ?? null;

    return {
        data: {movie: movieValidation.data, persons: personValidation.data},
        isPending,
        isError,
        queryError,
        parseError,
    };
}