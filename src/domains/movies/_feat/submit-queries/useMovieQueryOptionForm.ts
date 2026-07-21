/**
 * @fileoverview Hook for initializing and managing the movie query options form state.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {QueryOptionFormValues} from "@/common/_feat/query-options-form";
import {MovieQueryOptions, MovieQueryOptionSchema} from "@/domains/movies/_schema";
import {MovieQueryOptionFormValues} from "@/domains/movies/_feat/submit-queries/MovieQueryOptionFormValues";
import {
    useMovieQueryOptionFormDefaultValues
} from "@/domains/movies/_feat/submit-queries/useMovieQueryOptionFormDefaultValues.ts";

/** Initialises a React Hook Form instance for movie query filtering and sorting. */
export function useMovieQueryOptionForm(
    params: QueryOptionFormValues<MovieQueryOptionFormValues, MovieQueryOptions>
): UseFormReturn<MovieQueryOptionFormValues, unknown, MovieQueryOptions> {
    const defaultValues = useMovieQueryOptionFormDefaultValues(params);

    return useForm<MovieQueryOptionFormValues, unknown, MovieQueryOptions>({
        resolver: zodResolver(MovieQueryOptionSchema),
        defaultValues,
    });
}
