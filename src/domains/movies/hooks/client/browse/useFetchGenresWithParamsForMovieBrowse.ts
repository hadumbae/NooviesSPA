import useFetchMovieBrowseQueryParams from "@/domains/movies/hooks/params/useFetchMovieBrowseQueryParams.ts";
import useFetchMovieBrowseSortParams from "@/domains/movies/hooks/params/useFetchMovieBrowseSortParams.ts";
import useFetchGenres from "@/domains/genres/hooks/fetch-data/useFetchGenres.ts";
import {Genre} from "@/domains/genres/schema/genre/Genre.types.ts";

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