/**
 * @fileoverview Hook for initialising and managing the genre image upload form state.
 */

import {
    GenreImageUploadFormStarterValues
} from "@/domains/genres/_feat/manage-image/form/GenreImageUploadFormStarterValues.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {GenreImageUploadFormData, GenreImageUploadFormSchema} from "@/domains/genres/_feat/manage-image";

/** Initializes the react-hook-form instance for genre image uploads with Zod validation. */
export function useGenreImageUploadForm(): UseFormReturn<GenreImageUploadFormStarterValues, unknown, GenreImageUploadFormData> {
    const defaultValues: GenreImageUploadFormStarterValues = {
        image: "",
    };

    return useForm<GenreImageUploadFormStarterValues, unknown, GenreImageUploadFormData>({
        resolver: zodResolver(GenreImageUploadFormSchema),
        defaultValues,
    });
}