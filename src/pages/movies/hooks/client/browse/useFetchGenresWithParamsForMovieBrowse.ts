import useFetchAllGenres from "@/pages/genres/hooks/useFetchAllGenres.ts";
import useFetchMovieBrowseQueryParams from "@/pages/movies/hooks/params/useFetchMovieBrowseQueryParams.ts";
import useFetchMovieBrowseSortParams from "@/pages/movies/hooks/params/useFetchMovieBrowseSortParams.ts";

export default function useFetchGenresWithParamsForMovieBrowse() {
    // Fetch Genres
    const {data: genres = [], isPending, isSuccess, isError, error, refetch} = useFetchAllGenres();
    const {query, setMovieQueryParams} = useFetchMovieBrowseQueryParams({genres});
    const {sort, setMovieSortParams} = useFetchMovieBrowseSortParams();

    return {
        genres,
        isPending,
        isSuccess,
        isError,
        error,
        refetch,
        query,
        setMovieQueryParams,
        sort,
        setMovieSortParams,
    }
}