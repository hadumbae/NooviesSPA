import {z} from "zod";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import refineRequireImageFile from "@/common/utility/schemas/refineRequiredImageFile.ts";

/**
 * Schema representing the initial or default form values
 * for uploading a movie poster image.
 *
 * @remarks
 * This schema defines the shape of the form’s starter values,
 * typically used for initializing form state before a user selects a file.
 *
 * @example
 * ```ts
 * const defaultValues = MoviePosterImageFormValuesSchema.parse({
 *   posterImage: null,
 * });
 * ```
 */
export const MoviePosterImageFormValuesSchema = z.object({
    /** The initial value of the movie poster image field. */
    posterImage: FormStarterValueSchema,
});

/**
 * Schema validating the uploaded movie poster image file.
 *
 * @remarks
 * - Ensures that `posterImage` is an instance of the `File` object.
 * - Uses a custom refinement (`refineRequireImageFile`) to validate:
 *   - That a file is provided.
 *   - That the file is not empty.
 *   - That the file’s MIME type is one of the accepted image formats.
 *
 * @example
 * ```ts
 * const formData = new FormData();
 * formData.append("posterImage", file);
 *
 * MoviePosterImageFormSchema.parse({
 *   posterImage: file,
 * });
 * ```
 *
 * @see {@link refineRequireImageFile} for detailed validation logic.
 */
export const MoviePosterImageFormSchema = z.object({
    /** The uploaded poster image file. Required and must be a valid image. */
    posterImage: z.instanceof(File, {message: "Required."}),
}).superRefine(refineRequireImageFile({field: "posterImage"}));
