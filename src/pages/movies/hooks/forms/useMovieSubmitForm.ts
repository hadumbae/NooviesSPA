import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MovieFormSchema } from "@/pages/movies/schema/form/MovieForm.schema.ts";
import { Movie } from "@/pages/movies/schema/movie/Movie.types.ts";
import { MovieFormValues } from "@/pages/movies/schema/form/MovieForm.types.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";

/**
 * Parameters for {@link useMovieSubmitForm}.
 */
type MovieFormParams = {
    /** Optional preset values to prefill the form fields. Overrides `movie` defaults if provided. */
    presetValues?: Partial<MovieFormValues>;
    /** Optional movie object to populate form values when editing an existing movie. */
    movie?: Movie;
};

/**
 * Custom React hook for initializing a movie form using `react-hook-form`.
 *
 * This hook:
 * - Sets up default values for each movie field using the following priority:
 *   1. `presetValues` provided to the hook
 *   2. Values from an existing `movie` object
 *   3. Fallback default for each field
 * - Integrates `zod` schema validation via `zodResolver` with {@link MovieFormSchema}.
 * - Returns a fully typed `UseFormReturn<MovieFormValues>` instance, including methods
 *   such as `register`, `handleSubmit`, `watch`, `reset`, etc.
 *
 * @param params - Optional parameters for prefilling or editing the form.
 * @returns A `UseFormReturn<MovieFormValues>` instance for managing the movie form.
 *
 * @example
 * ```ts
 * const { register, handleSubmit, formState } = useMovieSubmitForm({
 *   movie: existingMovie,
 *   presetValues: { title: "Custom Title" }
 * });
 *
 * const onSubmit = (values: MovieFormValues) => console.log(values);
 *
 * <form onSubmit={handleSubmit(onSubmit)}>
 *   <input {...register("title")} />
 *   <button type="submit">Save</button>
 * </form>
 * ```
 */
export default function useMovieSubmitForm(
    params: MovieFormParams = {}
): UseFormReturn<MovieFormValues> {
    const { presetValues, movie } = params;

    // ⚡ Format Release Date ⚡

    const movieReleaseDate = movie?.releaseDate?.toFormat("yyyy-MM-dd");

    // ⚡ Default Values ⚡

    const defaultValues: MovieFormValues = {
        title: getDefaultValue(presetValues?.title, movie?.title, ""),
        originalTitle: getDefaultValue(presetValues?.originalTitle, movie?.originalTitle, ""),
        tagline: getDefaultValue(presetValues?.tagline, movie?.tagline, ""),
        country: getDefaultValue(presetValues?.country, movie?.country, ""),
        synopsis: getDefaultValue(presetValues?.synopsis, movie?.synopsis, ""),
        releaseDate: getDefaultValue(presetValues?.releaseDate, movieReleaseDate, ""),
        isReleased: getDefaultValue(presetValues?.isReleased, movie?.isReleased, false),
        runtime: getDefaultValue(presetValues?.runtime, movie?.runtime, ""),
        originalLanguage: getDefaultValue(presetValues?.originalLanguage, movie?.originalLanguage, ""),
        trailerURL: getDefaultValue(presetValues?.trailerURL, movie?.trailerURL, ""),
        languages: getDefaultValue(presetValues?.languages, movie?.languages, []),
        subtitles: getDefaultValue(presetValues?.subtitles, movie?.subtitles, []),
        genres: getDefaultValue(presetValues?.genres, movie?.genres, []),
        isAvailable: getDefaultValue(presetValues?.isAvailable, movie?.isAvailable, true),
    };

    // ⚡ Initialize ⚡

    return useForm<MovieFormValues>({
        resolver: zodResolver(MovieFormSchema),
        defaultValues,
    });
}
