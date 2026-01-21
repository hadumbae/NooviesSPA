import {z} from "zod";
import {
    TheatreShowingQueryFormValuesSchema,
    TheatreShowingQueryOptionSchema
} from "@/pages/showings/schema/features/movie-showings/TheatreShowingQueryOptions.schema.ts";

/**
 * Inferred query option type for Theatre Showing queries.
 */
export type TheatreShowingQueryOptions =
    z.infer<typeof TheatreShowingQueryOptionSchema>;

/**
 * Inferred form value type for Theatre Showing query forms.
 */
export type TheatreShowingQueryFormValues =
    z.infer<typeof TheatreShowingQueryFormValuesSchema>;
