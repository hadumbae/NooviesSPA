import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MovieFormSchema} from "@/pages/movies/schema/form/MovieForm.schema.ts";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {MovieFormValues} from "@/pages/movies/schema/form/MovieForm.types.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";

/**
 * Parameters for {@link useMovieSubmitForm}.
 */
type MovieFormParams = {
    /** Optional preset values to prefill the form fields. */
    presetValues?: Partial<MovieFormValues>;
    /** Optional movie object to populate form values from an existing movie. */
    movie?: Movie;
};

/**
 * Custom React hook for initializing a movie form with react-hook-form.
 *
 * Automatically sets up default values from either:
 * - `presetValues` provided to the hook
 * - Existing `movie` object
 * - Fallback defaults for each field
 *
 * Integrates `zod` validation via `zodResolver` using {@link MovieFormSchema}.
 *
 * @param params - Optional parameters to prefill the form or provide a movie object.
 * @returns An instance of {@link UseFormReturn} for {@link MovieFormValues}, including
 * methods like `register`, `handleSubmit`, `watch`, `reset`, etc.
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
export default function useMovieSubmitForm(params?: MovieFormParams): UseFormReturn<MovieFormValues> {
    const {presetValues, movie} = params || {};

    const movieReleaseDate = movie?.releaseDate?.toISOString().split("T")[0];

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

    return useForm<MovieFormValues>({
        resolver: zodResolver(MovieFormSchema),
        defaultValues,
    });
}