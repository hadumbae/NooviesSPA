import {z} from "zod";
import {CoercedNonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {ScreenDetailsActiveTabEnum} from "@/pages/screens/schema/params/ScreenDetailsActiveTabEnumSchema.ts";

/**
 * Schema for query parameters used when searching or paginating through a theatre screen's data.
 *
 * This includes pagination for both seat listings and showings, as well as tab selection.
 */
export const ScreenDetailsSearchParamSchema = z.object({
    /**
     * Specifies which tab should be active in the UI.
     *
     * Can be either `"seats"` or `"showings"`. Defaults to `"seats"` if not provided.
     */
    activeTab: ScreenDetailsActiveTabEnum
        .optional()
        .default("view-seats"),

    /**
     * Current page number for seat listings.
     *
     * Must be a non-negative number. Defaults to `1` if not provided.
     */
    seatPage: CoercedNonNegativeNumberSchema
        .optional()
        .default(1),

    /**
     * Number of seats to show per page.
     *
     * Must be a non-negative number. Defaults to `10` if not provided.
     */
    seatsPerPage: CoercedNonNegativeNumberSchema
        .optional()
        .default(15),

    /**
     * Current page number for showings.
     *
     * Must be a non-negative number. Defaults to `1` if not provided.
     */
    showingPage: CoercedNonNegativeNumberSchema
        .optional()
        .default(1),

    /**
     * Number of showings to show per page.
     *
     * Must be a non-negative number. Defaults to `10` if not provided.
     */
    showingsPerPage: CoercedNonNegativeNumberSchema
        .optional()
        .default(15),
});

/**
 * Type representing search and pagination parameters for viewing seat or showing data
 * associated with a specific theatre screen.
 *
 * Includes information like which tab is active, current page, and number of items per page.
 */
export type ScreenDetailsSearchParams = z.infer<typeof ScreenDetailsSearchParamSchema>;