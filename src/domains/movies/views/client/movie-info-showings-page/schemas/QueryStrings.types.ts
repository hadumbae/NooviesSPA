/**
 * @file Types derived from showings page query schemas.
 * @filename QueryStrings.types.ts
 */

import {z} from "zod";
import {
    ShowingsPageQueryFormValuesSchema,
    ShowingsPageQueryStringSchema
} from "@/domains/movies/views/client/movie-info-showings-page/schemas/QueryStrings.schema.ts";

/**
 * Parsed query strings for the showings page.
 */
export type ShowingsPageQueryStrings =
    z.infer<typeof ShowingsPageQueryStringSchema>;

/**
 * Form values corresponding to {@link ShowingsPageQueryFormValuesSchema}.
 */
export type ShowingsPageQueryFormValues =
    z.infer<typeof ShowingsPageQueryFormValuesSchema>;