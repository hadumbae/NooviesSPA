import { z } from "zod";
import { FormStarterValueSchema } from "@/common/schema/form/FormStarterValueSchema.ts";
import { GenreSchema } from "@/pages/genres/schema/genre/Genre.schema.ts";

/**
 * Schema for raw genre form input.
 *
 * Used to validate unprocessed UI form values before transformation.
 */
export const GenreFormValuesSchema = z.object({
    /** Genre name input. */
    name: FormStarterValueSchema,

    /** Genre description input. */
    description: FormStarterValueSchema,
});

/**
 * Schema for validated genre form data.
 *
 * Derived from {@link GenreSchema} with system-managed fields removed.
 * Intended for API submission and persistence.
 */
export const GenreFormSchema = GenreSchema.omit({
    _id: true,
    slug: true,
});
