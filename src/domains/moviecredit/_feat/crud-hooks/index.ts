import {useFetchMovieCredit} from "@/domains/moviecredit/_feat/crud-hooks/useFetchMovieCredit.ts";
import {useFetchPaginatedMovieCredits} from "@/domains/moviecredit/_feat/crud-hooks/useFetchPaginatedMovieCredits.ts";
import {useFetchMovieCredits} from "@/domains/moviecredit/_feat/crud-hooks/useFetchMovieCredits.ts";
import {useMovieCreditSubmitMutation} from "@/domains/moviecredit/_feat/crud-hooks/useMovieCreditSubmitMutation.ts";
import {useMovieCreditDeleteMutation} from "@/domains/moviecredit/_feat/crud-hooks/useMovieCreditDeleteMutation.ts";

export {
    useFetchMovieCredit,
    useFetchMovieCredits,
    useFetchPaginatedMovieCredits,
    useMovieCreditSubmitMutation,
    useMovieCreditDeleteMutation,
}

