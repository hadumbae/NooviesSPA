import {z} from "zod";
import {
    TheatreDetailsSearchParamSchema,
    TheatreDetailsParamSchema
} from "@/pages/theatres/schema/params/TheatreDetailsParams.schema.ts";

/**
 * Type inferred from {@link TheatreDetailsParamSchema}.
 *
 * Represents the route parameters for the theatre details page.
 */
export type TheatreDetailsParams = z.infer<typeof TheatreDetailsParamSchema>;

/**
 * Type inferred from {@link TheatreDetailsSearchParamSchema}.
 *
 * Represents the search (query string) parameters for the theatre details page.
 */
export type TheatreDetailsSearchParams = z.infer<typeof TheatreDetailsSearchParamSchema>;