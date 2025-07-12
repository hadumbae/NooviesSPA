import {z} from "zod";
import {CoercedNonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";

/**
 * Schema for identifying a specific screen within a theatre.
 *
 * Used when both `theatreID` and `screenID` are required to reference a screen.
 */
export const ScreenDetailsParamsSchema = z.object({
    /**
     * Unique identifier for the theatre.
     */
    theatreID: IDStringSchema,

    /**
     * Unique identifier for the screen within the theatre.
     */
    screenID: IDStringSchema,
});

/**
 * Schema for query parameters used when searching or paginating through a theatre screen's data.
 *
 * This includes pagination for both seat listings and showings, as well as tab selection.
 */
export const ScreenDetailsSearchParamsSchema = z.object({
    /**
     * Specifies which tab should be active in the UI.
     *
     * Can be either `"seats"` or `"showings"`. Defaults to `"seats"` if not provided.
     */
    activeTab: z
        .union([z.literal("seats"), z.literal("showings")], {message: "Must be 'seats' or 'showings'."})
        .optional()
        .default("seats"),

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

