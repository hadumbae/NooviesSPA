/**
 * @fileoverview Hook for managing the movie poster image submission form.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    MoviePosterImageFormData,
    MoviePosterImageFormSchema,
    MoviePosterImageFormValues
} from "@/domains/movies/_feat/manage-images/form/MoviePosterImageFormSchema.ts";

/** Initializes and manages the react-hook-form state for movie poster uploads. */
export function useMoviePosterImageSubmitForm(): UseFormReturn<MoviePosterImageFormValues, unknown, MoviePosterImageFormData> {
    const defaultValues: MoviePosterImageFormValues = {
        posterImage: "",
    };

    return useForm<MoviePosterImageFormValues, unknown, MoviePosterImageFormData>({
        resolver: zodResolver(MoviePosterImageFormSchema),
        defaultValues,
    });
}
