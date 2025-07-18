import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {MovieCreditFilters} from "@/pages/moviecredit/schemas/filters/MovieCreditFilterSchema.ts";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import useFetchPaginatedMovieCredit from "@/pages/moviecredit/hooks/queries/useFetchPaginatedMovieCredit.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import {
    MovieCreditPopulatedPaginationSchema
} from "@/pages/moviecredit/schemas/model/paginated/MovieCreditPopulatedPaginationSchema.ts";
import {MovieWithDataSchema} from "@/pages/movies/schema/model/populated/MovieWithDataSchema.ts";

interface FetchParams {
    _id: ObjectId;
    creditFilters?: MovieCreditFilters;
    virtuals?: boolean;
    page?: number;
    perPage?: number;
}

export default function useFetchPopulatedMovieWithCredits(params: FetchParams) {
    const {_id, creditFilters = {}, page = 1, perPage = 20, virtuals = false} = params;

    // Query

    const movieQuery = useFetchMovie({_id, virtuals, populate: true});
    const creditQuery = useFetchPaginatedMovieCredit({page, perPage, filters: {...creditFilters, movie: _id}, populate: true});
    const queries = [movieQuery, creditQuery];

    const isPending = queries.some((query) => query.isPending);
    const isError = queries.some((query) => query.isError);
    const queryError = queries.find((query) => query.isError)?.error ?? null;

    // Validation

    const movieValidation = useValidateData<typeof MovieWithDataSchema>({
        isPending,
        data: movieQuery.data,
        schema: MovieWithDataSchema,
    });

    const creditValidation = useValidateData<typeof MovieCreditPopulatedPaginationSchema>({
        isPending,
        data: creditQuery.data,
        schema: MovieCreditPopulatedPaginationSchema,
    });

    const parseSuccess = movieValidation.success && creditValidation.success;
    const parseError = movieValidation.error ?? creditValidation.error ?? null;

    return {
        data: {movie: movieValidation.data, credits: creditValidation.data},
        isPending,
        isError,
        queryError,
        parseSuccess,
        parseError,
    };
}