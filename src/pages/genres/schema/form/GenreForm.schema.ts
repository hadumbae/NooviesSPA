import { z } from "zod";
import { FormStarterValueSchema } from "@/common/schema/form/FormStarterValueSchema.ts";
import { GenreSchema } from "@/pages/genres/schema/genre/Genre.schema.ts";

/**
 * Schema for raw genre form values.
 *
 * @remarks
 * Intended for validating unprocessed user input directly from UI forms.
 * Each field uses {@link FormStarterValueSchema} to provide consistent
 * base handling such as trimming, empty-value normalization, and
 * optional/null support.
 *
 * @property name - Name of the genre.
 * @property description - Description of the genre.
 */
export const GenreFormValuesSchema = z.object({
    /** Name of the genre. */
    name: FormStarterValueSchema,

    /** Description of the genre. */
    description: FormStarterValueSchema,
});

/**
 * Schema for validated genre form data.
 *
 * @remarks
 * Derived from {@link GenreSchema} with the identifier omitted.
 * Represents the final, domain-valid data produced after transforming
 * and validating raw form values.
 *
 * Use this schema when submitting form data to the API or persisting
 * a new or updated genre entity.
 */
export const GenreFormSchema = GenreSchema.omit({ _id: true });
