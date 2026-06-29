import {useFetchMovieCredit} from "@/domains/movie-credits/_feat/crud-hooks/useFetchMovieCredit.ts";
import {useFetchPaginatedMovieCredits} from "@/domains/movie-credits/_feat/crud-hooks/useFetchPaginatedMovieCredits.ts";
import {useFetchMovieCredits} from "@/domains/movie-credits/_feat/crud-hooks/useFetchMovieCredits.ts";
import {useMovieCreditSubmitMutation} from "@/domains/movie-credits/_feat/crud-hooks/useMovieCreditSubmitMutation.ts";
import {useMovieCreditDeleteMutation} from "@/domains/movie-credits/_feat/crud-hooks/useMovieCreditDeleteMutation.ts";
import {MovieCreditCRUDMutationKeys} from "@/domains/movie-credits/_feat/crud-hooks/mutationKeys.ts";
import {MovieCreditCRUDQueryKeys} from "@/domains/movie-credits/_feat/crud-hooks/queryKeys.ts";

export {
    MovieCreditCRUDMutationKeys,
    MovieCreditCRUDQueryKeys,
    useFetchMovieCredit,
    useFetchMovieCredits,
    useFetchPaginatedMovieCredits,
    useMovieCreditSubmitMutation,
    useMovieCreditDeleteMutation,
}

