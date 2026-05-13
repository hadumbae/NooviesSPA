/**
 * @fileoverview Custom hook for managing the movie poster image submission form.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    MoviePosterImageFormData,
    MoviePosterImageFormSchema,
    MoviePosterImageFormValues
} from "./MoviePosterImageFormSchema.ts";

/**
 * Initializes and manages the form state for uploading movie poster images.
 */
export default function useMoviePosterImageSubmitForm(): UseFormReturn<MoviePosterImageFormValues, unknown, MoviePosterImageFormData> {
    const defaultValues: MoviePosterImageFormValues = {
        posterImage: "",
    };

    return useForm<MoviePosterImageFormValues, unknown, MoviePosterImageFormData>({
        resolver: zodResolver(MoviePosterImageFormSchema),
        defaultValues,
    });
}
