import {useFetchMovie} from "@/domains/movies/_feat/crud-hooks/fetch/useFetchMovie.ts";
import {useFetchMovieBySlug} from "@/domains/movies/_feat/crud-hooks/fetch/useFetchMovieBySlug.ts";
import {useFetchMovies} from "@/domains/movies/_feat/crud-hooks/fetch/useFetchMovies.ts";
import {useFetchPaginatedMovies} from "@/domains/movies/_feat/crud-hooks/fetch/useFetchPaginatedMovies.ts";

export {
    useFetchMovie,
    useFetchMovieBySlug,
    useFetchMovies,
    useFetchPaginatedMovies,
}