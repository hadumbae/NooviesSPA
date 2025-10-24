import useFetchMovieBrowseQueryParams from "@/pages/movies/hooks/params/useFetchMovieBrowseQueryParams.ts";
import useFetchMovieBrowseSortParams from "@/pages/movies/hooks/params/useFetchMovieBrowseSortParams.ts";
import useFetchGenres from "@/pages/genres/hooks/useFetchGenres.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";

export default function useFetchGenresWithParamsForMovieBrowse() {
    // Fetch Genres
    const {data: genres = [], isPending, isSuccess, isError, error, refetch} = useFetchGenres();
    const {query, setMovieQueryParams} = useFetchMovieBrowseQueryParams({genres: genres as Genre[]});
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