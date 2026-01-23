import useFetchMovieBySlug from "@/pages/movies/hooks/queries/useFetchMovieBySlug.ts";
import useFetchPaginatedShowings from "@/pages/showings/hooks/queries/useFetchPaginatedShowings.ts";
import {QueryDefinition} from "@/common/type/query/loader/MultiQuery.types.ts";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {PaginatedShowingDetailsSchema} from "@/pages/showings/schema/showing/ShowingRelated.schema.ts";
import {ShowingQueryOptions} from "@/pages/showings/schema/queries/ShowingQueryOption.types.ts";

type QueryParams = {
    movieSlug: string;
    page: number;
    perPage: number;
    queries: ShowingQueryOptions;
};

export function useMovieShowingListQueries(
    {movieSlug, page, perPage, queries}: QueryParams
): QueryDefinition[] {
    const movieQuery = useFetchMovieBySlug({
        slug: movieSlug,
        config: {populate: true, virtuals: true},
    });

    const showingQuery = useFetchPaginatedShowings({
        page,
        perPage,
        config: {populate: true, virtuals: true},
        queries: {
            ...queries,
            movieSlug,
            status: "SCHEDULED",
            isActive: true,
            sortByStartTime: "desc",
        },
    });

    return [
        {
            key: "movie",
            query: movieQuery,
            schema: MovieDetailsSchema,
        },
        {
            key: "paginatedShowings",
            query: showingQuery,
            schema: PaginatedShowingDetailsSchema,
        },
    ];
}