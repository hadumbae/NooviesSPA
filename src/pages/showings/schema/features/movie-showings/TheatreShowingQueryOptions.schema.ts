/**
 * @file TheatreShowingQueryOption.schema.ts
 *
 * Theatre-scoped Showing query options.
 *
 * Defines a restricted subset of {@link ShowingQueryOptionSchema}
 * limited to reference-level filters suitable for Theatre listings.
 */

import {ShowingQueryOptionSchema} from "@/pages/showings/schema/queries/ShowingQueryOption.schema.ts";
import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";

/**
 * Query option schema for Theatre-specific Showing listings.
 *
 * Restricts filters to reference-based fields only.
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
 * Form-compatible schema for Theatre Showing query values.
 *
 * Normalizes empty inputs for safe form handling.
 */
export const TheatreShowingQueryFormValuesSchema =
    generateFormValueSchema(TheatreShowingQueryOptionSchema);
