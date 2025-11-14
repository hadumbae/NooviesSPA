import {z} from "zod";
import {CoercedNonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Schema defining the **search (query string) parameters**
 * for the **Theatre Details** page.
 *
 * This schema validates and normalizes query parameters that control:
 * - The active tab state (`screens` or `showings`)
 * - Pagination for both **screens** and **showings** lists
 *
 * @remarks
 * Each field is optional and can be omitted from the query string.
 * When not provided, application defaults should be used (e.g. tab `"screens"`, page `1`, per-page `10`).
 *
 * @example
 * ```ts
 * const params = {
 *   activeTab: "showings",
 *   screenPage: 2,
 *   screenPerPage: 20,
 *   showingPage: 1,
 *   showingPerPage: 10,
 * };
 *
 * const parsed = TheatreDetailsSearchParamSchema.parse(params);
 * ```
 */
export const TheatreDetailsSearchParamSchema = z.object({
    /**
     * The currently active tab on the Theatre Details page.
     *
     * @example "screens"
     * @example "showings"
     */
    activeTab: z
        .enum(["screens", "showings"], {message: "Invalid value. Must be 'screens' or 'showings'."})
        .optional(),

    /** Current page of the **screens** list. */
    screenPage: CoercedNonNegativeNumberSchema.optional(),

    /** Number of items per page for the **screens** list. */
    screenPerPage: CoercedNonNegativeNumberSchema.optional(),

    /** Current page of the **showings** list. */
    showingPage: CoercedNonNegativeNumberSchema.optional(),

    /** Number of items per page for the **showings** list. */
    showingPerPage: CoercedNonNegativeNumberSchema.optional(),
});

/**
 * Type inferred from {@link TheatreDetailsSearchParamSchema}.
 *
 * Represents the validated and normalized query string parameters
 * used by the Theatre Details page for tab and pagination state.
 */
export type TheatreDetailsSearchParams = z.infer<typeof TheatreDetailsSearchParamSchema>;
