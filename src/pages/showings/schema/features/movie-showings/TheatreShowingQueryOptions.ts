/**
 * @file TheatreShowingQueryOption.schema.ts
 *
 * Theatre-scoped Showing query options.
 *
 * Defines a restricted subset of {@link ShowingQueryOptionSchema}
 * limited to reference-level filters applicable to Theatre listings.
 */

import { ShowingQueryOptionSchema } from "@/pages/showings/schema/queries/ShowingQueryOption.schema.ts";
import { z } from "zod";

/**
 * Zod schema for Theatre-scoped Showing queries.
 */
export const TheatreShowingQueryOptionSchema = ShowingQueryOptionSchema.pick({
    movieSlug: true,
    theatreSlug: true,
    screenSlug: true,
    theatreState: true,
    theatreCity: true,
    theatreCountry: true,
});

/**
 * Inferred query option type for Theatre Showing queries.
 */
export type TheatreShowingQueryOptions = z.infer<typeof TheatreShowingQueryOptionSchema>;
