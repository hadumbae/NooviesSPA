import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {MovieQueryOptionSchema} from "@/pages/movies/schema/queries/MovieQueryOption.schema.ts";
import {z} from "zod";

/**
 * Zod schema representing the validated and form-ready structure of movie query options.
 *
 * This schema is derived from {@link MovieQueryOptionSchema} using the `generateFormValueSchema`
 * utility, which adapts query parameter schemas for form value compatibility.
 *
 * @remarks
 * The generated schema ensures that all form values adhere to the same
 * validation and transformation rules as the original query schema.
 *
 * @example
 * ```ts
 * const parsed = MovieQueryOptionFormValueSchema.parse({
 *   title: "Inception",
 *   releaseYear: 2010,
 *   genre: "Sci-Fi"
 * });
 * ```
 */
export const MovieQueryOptionFormValueSchema = generateFormValueSchema(MovieQueryOptionSchema);

/**
 * Type alias representing the inferred TypeScript type of
 * {@link MovieQueryOptionFormValueSchema}.
 *
 * @example
 * ```ts
 * const values: MovieQueryOptionFormValues = {
 *   title: "Inception",
 *   releaseYear: 2010,
 *   genre: "Sci-Fi"
 * };
 * ```
 */
export type MovieQueryOptionFormValues = z.infer<typeof MovieQueryOptionFormValueSchema>;
