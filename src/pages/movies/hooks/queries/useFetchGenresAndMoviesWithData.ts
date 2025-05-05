import useFetchPaginatedMoviesWithData from "@/pages/movies/hooks/queries/useFetchPaginatedMoviesWithData.ts";
import useFetchGenresWithParamsForMovieBrowse
    from "@/pages/movies/hooks/client/browse/useFetchGenresWithParamsForMovieBrowse.ts";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";

interface FetchQueryDataParams {
    overridePage?: number;
    overridePerPage?: number;
}

export default function useFetchGenresAndMoviesWithData(params?: FetchQueryDataParams) {
    const {overridePage, overridePerPage} = params || {};

    const genreQuery = useFetchGenresWithParamsForMovieBrowse();
    const {page, perPage} = usePaginationSearchParams();
    const {query, sort} = genreQuery;

    console.log("Query: ", query);

    const movieQuery = useFetchPaginatedMoviesWithData({
        page: overridePage || page,
        perPage: overridePerPage || perPage,
        query,
        sort
    });

    const queries = [genreQuery, movieQuery];
    const isPending = queries.some(fetchQuery => fetchQuery.isPending);
    const isError = queries.some(fetchQuery => fetchQuery.isError);
    const error = queries.find(fetchQuery => fetchQuery.error)?.error ?? null;

    return {
        genres: genreQuery.genres,
        movies: movieQuery.data?.items,
        totalMovies: movieQuery.data?.totalItems,

        refetchGenres: genreQuery.refetch,
        refetchMovies: movieQuery.refetch,

        isPending,
        isError,
        error,
    }
}