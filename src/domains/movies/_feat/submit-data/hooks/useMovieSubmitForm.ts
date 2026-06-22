/** @fileoverview Custom hook for initializing and validating the movie submission form using React Hook Form and Zod. */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MovieFormData, MovieFormSchema, MovieFormStarterValues} from "@/domains/movies/_feat/submit-data/schema/MovieFormSchema.ts";
import {Movie} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {useMovieSubmitFormDefaultValues} from "@/domains/movies/_feat/submit-data/hooks/useMovieSubmitFormDefaultValues.ts";

/** Parameters for configuring the movie form initialization. */
type MovieFormParams = {
    presetValues?: Partial<MovieFormStarterValues>;
    movie?: Movie;
};

/**
 * Initializes a movie form with standardized validation and default values.
 */
export function useMovieSubmitForm(
    {presetValues, movie}: MovieFormParams = {}
): UseFormReturn<MovieFormStarterValues, unknown, MovieFormData> {
    const defaultValues = useMovieSubmitFormDefaultValues({presetValues, movie});

    return useForm<MovieFormStarterValues, unknown, MovieFormData>({
        resolver: zodResolver(MovieFormSchema),
        defaultValues,
    });
}