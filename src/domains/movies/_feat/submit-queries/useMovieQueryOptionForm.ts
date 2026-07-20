/**
 * @fileoverview Hook for managing movie query option form state and validation.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MovieQueryOptions, MovieQueryOptionSchema} from "@/domains/movies/_schema";

import {MovieQueryOptionFormValues} from "@/domains/movies/_feat/submit-queries/MovieQueryOptionFormValues";

/** Parameters for initializing the movie query option form. */
type FormParams = {
    presetValues?: Partial<MovieQueryOptions>;
};

/** Initialises a react-hook-form instance for movie query options with Zod validation. */
export function useMovieQueryOptionForm(
    {presetValues}: FormParams = {}
): UseFormReturn<MovieQueryOptionFormValues, unknown, MovieQueryOptions> {
    const defaultValues: MovieQueryOptionFormValues = {
        _id: "",
        title: "",
        originalTitle: "",
        releaseDate: "",
        isReleased: "",
        isAvailable: "",
        country: "",
        sortByReleaseDate: "",
        sortByTitle: "",
        sortByOriginalTitle: "",
        sortByIsReleased: "",
        sortByIsAvailable: "",
        sortByCountry: "",
        ...presetValues,
    };

    return useForm<MovieQueryOptionFormValues, unknown, MovieQueryOptions>({
        resolver: zodResolver(MovieQueryOptionSchema),
        defaultValues,
    });
}
