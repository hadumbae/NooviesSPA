import {z} from "zod";
import {CoercedNonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Schema for the search parameters (query string) of the theatre details page.
 *
 * Provides optional pagination and tab state for the theatre details page.
 *
 * @remarks
 * - `activeTab`: Controls which tab is active. Defaults to `"screens"`.
 * - `screenPage` / `screenPerPage`: Pagination for the screens list. Defaults: 1 / 10.
 * - `showingPage` / `showingPerPage`: Pagination for the showings list. Defaults: 1 / 10.
 *
 * @example
 * // Valid query params
 * {
 *   activeTab: "showings",
 *   screenPage: 2,
 *   screenPerPage: 20,
 *   showingPage: 1,
 *   showingPerPage: 10
 * }
 */
export const TheatreDetailsSearchParamSchema = z.object({
    /** Which tab is active on the theatre details page. Defaults to "screens". */
    activeTab: z
        .enum(["screens", "showings"], { message: "Invalid value. Must be 'screens' or 'showings'." })
        .optional()
        .default("screens"),

    /** Current page of the screens list. Defaults to 1. */
    screenPage: CoercedNonNegativeNumberSchema.optional().default(1),

    /** Number of screens to show per page. Defaults to 10. */
    screenPerPage: CoercedNonNegativeNumberSchema.optional().default(10),

    /** Current page of the showings list. Defaults to 1. */
    showingPage: CoercedNonNegativeNumberSchema.optional().default(1),

    /** Number of showings to show per page. Defaults to 10. */
    showingPerPage: CoercedNonNegativeNumberSchema.optional().default(10),
});

/**
 * Type inferred from {@link TheatreDetailsSearchParamSchema}.
 *
 * Represents the search (query string) parameters for the theatre details page.
 */
export type TheatreDetailsSearchParams = z.infer<typeof TheatreDetailsSearchParamSchema>;