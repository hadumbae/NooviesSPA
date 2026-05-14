import {MovieCRUDQueryKeys} from "@/domains/movies/_feat/crud-hooks/queryKeys.ts";
import {useFetchMovie} from "@/domains/movies/_feat/crud-hooks/useFetchMovie.ts";
import {useFetchMovieBySlug} from "@/domains/movies/_feat/crud-hooks/useFetchMovieBySlug.ts";
import {useFetchMovies} from "@/domains/movies/_feat/crud-hooks/useFetchMovies.ts";
import {useFetchPaginatedMovies} from "@/domains/movies/_feat/crud-hooks/useFetchPaginatedMovies.ts";
import {MovieCRUDMutationKeys} from "@/domains/movies/_feat/crud-hooks/mutationKeys.ts";
import {useMovieSubmitMutation} from "@/domains/movies/_feat/crud-hooks/useMovieSubmitMutation.ts";
import useMovieDeleteMutation from "@/domains/movies/_feat/crud-hooks/useMovieDeleteMutation.ts";

export {
    MovieCRUDQueryKeys,
    MovieCRUDMutationKeys,
    useFetchMovie,
    useFetchMovieBySlug,
    useFetchMovies,
    useFetchPaginatedMovies,
    useMovieSubmitMutation,
    useMovieDeleteMutation,
}

