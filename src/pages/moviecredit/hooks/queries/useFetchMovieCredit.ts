import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {MovieCredit, MovieCreditSchema} from "@/pages/moviecredit/schemas/MovieCreditSchema.ts";
import MovieCreditRepository from "@/pages/moviecredit/repositories/MovieCreditRepository.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";

/**
 * Props for fetching a single movie credit.
 */
interface fetchProps {
    /** The unique identifier of the movie credit to fetch. */
    _id: ObjectId;

    /** Whether to populate related data in the response. Defaults to false. */
    populate?: boolean;
}

/**
 * React hook to fetch and validate a single movie credit entry.
 *
 * Fetches one movie credit document from the backend using its `_id`, and validates
 * the result using {@link MovieCreditSchema}. Automatically redirects on validation failure.
 *
 * @param params - Object containing the movie credit ID and an optional populate flag.
 * @returns A query result containing a validated {@link MovieCredit} object.
 */
export default function useFetchMovieCredit(params: fetchProps) {
    const {_id, populate = false} = params;

    const queryKey = ["fetch_movie_credit", {_id, populate}];
    const schema = MovieCreditSchema;
    const action = () => MovieCreditRepository.get({_id, populate});

    return useFetchValidatedDataWithRedirect<typeof MovieCreditSchema, MovieCredit>({queryKey, schema, action});
}