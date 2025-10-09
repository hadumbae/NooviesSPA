import {z} from "zod";
import {
    MoviePosterImageFormSchema,
    MoviePosterImageFormValuesSchema
} from "@/pages/movies/schema/form/MoviePosterImage.schema.ts";

/**
 * Type representing the initial or default form values for the
 * movie poster image upload form.
 *
 * @remarks
 * Derived from {@link MoviePosterImageFormValuesSchema}.
 * Typically used for initializing form state before the user selects a file.
 *
 * @example
 * ```ts
 * const defaultValues: MoviePosterImageFormValues = {
 *   posterImage: null,
 * };
 * ```
 */
export type MoviePosterImageFormValues = z.infer<typeof MoviePosterImageFormValuesSchema>;

/**
 * Type representing the validated form data for the movie poster
 * image upload form.
 *
 * @remarks
 * Derived from {@link MoviePosterImageFormSchema}. Ensures that the
 * `posterImage` field is a `File` instance and passes custom validation
 * (non-empty, accepted MIME type).
 *
 * @example
 * ```ts
 * function submitForm(values: MoviePosterImageForm) {
 *   // values.posterImage is guaranteed to be a valid File
 * }
 * ```
 */
export type MoviePosterImageForm = z.infer<typeof MoviePosterImageFormSchema>;
