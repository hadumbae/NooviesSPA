/**
 * @fileoverview Hook for initialising and managing the genre image upload form state.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    GenreImageUploadFormData,
    GenreImageUploadFormSchema,
    GenreImageUploadFormValues,
} from "@/domains/genres/_feat/manage-image/form/GenreImageUploadFormSchema.ts";

/** Initializes the react-hook-form instance for genre image uploads with Zod validation. */
export function useGenreImageUploadForm(): UseFormReturn<GenreImageUploadFormValues, unknown, GenreImageUploadFormData> {
    const defaultValues: GenreImageUploadFormValues = {
        image: "",
    };

    return useForm<GenreImageUploadFormValues, unknown, GenreImageUploadFormData>({
        resolver: zodResolver(GenreImageUploadFormSchema),
        defaultValues,
    });
}