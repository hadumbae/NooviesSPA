import {z} from "zod";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import {GenreBaseSchema} from "@/pages/genres/schema/genre/Genre.schema.ts";

/**
 * **GenreFormValuesSchema**
 *
 * Zod schema for the raw form values when creating or editing a genre.
 *
 * This schema is intended to validate user-provided input values from the form.
 * It reuses the `FormStarterValueSchema` for each field to enforce the same
 * base validation rules (e.g., string trimming, optional/null handling, etc.).
 *
 * **Fields:**
 * - `name` – Name of the genre.
 * - `description` – Description of the genre.
 */
export const GenreFormValuesSchema = z.object({
    name: FormStarterValueSchema,
    description: FormStarterValueSchema,
});

/**
 * **GenreFormSchema**
 *
 * Zod schema for the complete Genre form object.
 *
 * This schema extends the `GenreBaseSchema`, which may include additional
 * validated properties such as `id`, `createdAt`, etc. It represents the
 * finalized, validated form data after transformation from raw values.
 *
 * Use this schema when you need a fully typed and validated Genre entity.
 */
export const GenreFormSchema = GenreBaseSchema.extend({});