import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {CoercedNonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Schema for the route parameter of the theatre details page.
 */
export const TheatreDetailsParamSchema = z.object({
    /** The unique identifier of the theatre. */
    theatreID: IDStringSchema,
});

/**
 * Schema for the search parameters (query string) of the theatre details page.
 */
export const TheatreDetailsSearchParamSchema = z.object({
    /** Which tab is active on the theatre details page. Defaults to "screens". */
    activeTab: z.enum(["screens", "showings"], {message: "Invalid value. Must be 'screens' or 'showings'."})
        .optional()
        .default("screens"),

    /** The current page of the screens list. Defaults to 1. */
    screenPage: CoercedNonNegativeNumberSchema
        .optional()
        .default(1),

    /** The number of screens to show per page. Defaults to 10. */
    screenPerPage: CoercedNonNegativeNumberSchema
        .optional()
        .default(10),

    /** The current page of the showings list. Defaults to 1. */
    showingPage: CoercedNonNegativeNumberSchema
        .optional()
        .default(1),

    /** The number of showings to show per page. Defaults to 10. */
    showingPerPage: CoercedNonNegativeNumberSchema
        .optional()
        .default(10),
});

