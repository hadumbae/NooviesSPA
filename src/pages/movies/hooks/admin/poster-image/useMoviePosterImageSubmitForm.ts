import {MoviePosterImageFormValues} from "@/pages/movies/schema/form/MoviePosterImage.types.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MoviePosterImageFormSchema} from "@/pages/movies/schema/form/MoviePosterImage.schema.ts";

/**
 * Custom React Hook for managing the movie poster image upload form.
 *
 * @remarks
 * - Uses `react-hook-form` for form state management.
 * - Integrates Zod schema validation via `zodResolver` with
 *   {@link MoviePosterImageFormSchema}.
 * - Provides type-safe form values using {@link MoviePosterImageFormValues}.
 * - Sets default values for the form, initializing `posterImage` as an empty string.
 *
 * @returns {UseFormReturn<MoviePosterImageFormValues>} An object containing
 *   methods and state from `react-hook-form` for handling submission, validation,
 *   and input binding.
 *
 * @example
 * ```tsx
 * const { register, handleSubmit, formState } = useMoviePosterImageSubmitForm();
 *
 * function onSubmit(values: MoviePosterImageFormValues) {
 *   console.log(values.posterImage);
 * }
 *
 * <form onSubmit={handleSubmit(onSubmit)}>
 *   <input type="file" {...register("posterImage")} />
 *   <button type="submit">Upload</button>
 * </form>
 * ```
 */
export default function useMoviePosterImageSubmitForm(): UseFormReturn<MoviePosterImageFormValues> {
    const defaultValues: MoviePosterImageFormValues = {
        posterImage: "",
    };

    return useForm<MoviePosterImageFormValues>({
        resolver: zodResolver(MoviePosterImageFormSchema),
        defaultValues,
    });
}
