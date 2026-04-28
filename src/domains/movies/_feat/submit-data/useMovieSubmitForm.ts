/** @fileoverview Custom hook for initializing and validating the movie submission form using React Hook Form and Zod. */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MovieFormSchema} from "@/domains/movies/schema/form/MovieForm.schema.ts";
import {MovieForm, MovieFormValues} from "@/domains/movies/schema/form/MovieForm.types.ts";
import {Movie} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {useMovieSubmitFormDefaultValues} from "@/domains/movies/_feat/submit-data/useMovieSubmitFormDefaultValues.ts";

/** Parameters for configuring the movie form initialization. */
type MovieFormParams = {
    presetValues?: Partial<MovieFormValues>;
    movie?: Movie;
};

/**
 * Initializes a movie form with standardized validation and default values.
 */
export function useMovieSubmitForm(
    {presetValues, movie}: MovieFormParams = {}
): UseFormReturn<MovieFormValues, unknown, MovieForm> {
    const defaultValues = useMovieSubmitFormDefaultValues({presetValues, movie});

    return useForm<MovieFormValues, unknown, MovieForm>({
        resolver: zodResolver(MovieFormSchema),
        defaultValues,
    });
}