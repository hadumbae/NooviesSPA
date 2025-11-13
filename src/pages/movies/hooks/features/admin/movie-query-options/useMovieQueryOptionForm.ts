import { MovieQueryOptions } from "@/pages/movies/schema/queries/MovieQueryOption.types.ts";
import { useForm, UseFormReturn } from "react-hook-form";
import { MovieQueryOptionFormValues } from "@/pages/movies/schema/queries/MovieQueryOptionFormValueSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { MovieQueryOptionSchema } from "@/pages/movies/schema/queries/MovieQueryOption.schema.ts";

/**
 * Parameters for initializing the movie query option form.
 *
 * @property {Partial<MovieQueryOptions>} [presetValues] -
 * Optional predefined values used to populate the form’s default state.
 * Typically derived from previously saved query settings or URL parameters.
 *
 * @example
 * ```ts
 * const form = useMovieQueryOptionForm({
 *   presetValues: { title: "Inception", isReleased: true }
 * });
 * ```
 */
type FormParams = {
    presetValues?: Partial<MovieQueryOptions>;
};

/**
 * React Hook Form hook for managing movie query option forms.
 *
 * @remarks
 * This custom hook configures a React Hook Form instance using the
 * `MovieQueryOptionSchema` as its validation schema via Zod.
 * It supports optional preset values for initializing the form state,
 * enabling easy rehydration of search or filter settings.
 *
 * @param {FormParams} [params] - Optional parameters for initializing the form.
 * @returns {UseFormReturn<MovieQueryOptionFormValues>} The configured form instance,
 * compatible with React Hook Form components.
 *
 * @example
 * ```tsx
 * const form = useMovieQueryOptionForm({
 *   presetValues: {
 *     title: "Spirited Away",
 *     country: "Japan",
 *     sortByReleaseDate: "asc"
 *   }
 * });
 *
 * return (
 *   <FormProvider {...form}>
 *     <MovieQueryOptionForm />
 *   </FormProvider>
 * );
 * ```
 */
export default function useMovieQueryOptionForm(
    params: FormParams = {}
): UseFormReturn<MovieQueryOptionFormValues> {
    const { presetValues } = params;

    const defaultValues = {
        _id: presetValues?._id ?? "",
        title: presetValues?.title ?? "",
        originalTitle: presetValues?.originalTitle ?? "",
        releaseDate: presetValues?.releaseDate ?? "",
        genres: presetValues?.genres ?? "",
        isReleased: presetValues?.isReleased ?? undefined,
        isAvailable: presetValues?.isAvailable ?? undefined,
        country: presetValues?.country ?? "",
        sortByReleaseDate: presetValues?.sortByReleaseDate ?? undefined,
        sortByTitle: presetValues?.sortByTitle ?? undefined,
        sortByOriginalTitle: presetValues?.sortByOriginalTitle ?? undefined,
        sortByIsReleased: presetValues?.sortByIsReleased ?? undefined,
        sortByIsAvailable: presetValues?.sortByIsAvailable ?? undefined,
        sortByCountry: presetValues?.sortByCountry ?? undefined,
    };

    return useForm<MovieQueryOptionFormValues>({
        resolver: zodResolver(MovieQueryOptionSchema),
        defaultValues,
    });
}
