/**
 * @fileoverview Zod schema and TypeScript type for theatre detail search parameters, handling tab state and pagination.
 */

import {z} from "zod";
import {CoercedNonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Validates query string parameters for the theatre details view, including active tab selection and list pagination.
 */
export const TheatreDetailsSearchParamSchema = z.object({
    activeTab: z
        .enum(["screens", "showings"], {message: "Invalid value. Must be 'screens' or 'showings'."})
        .optional(),

    screenPage: CoercedNonNegativeNumberSchema.optional(),

    screenPerPage: CoercedNonNegativeNumberSchema.optional(),

    showingPage: CoercedNonNegativeNumberSchema.optional(),

    showingPerPage: CoercedNonNegativeNumberSchema.optional(),
});

/**
 * Type representing the validated search parameters for the theatre details page.
 */
export type TheatreDetailsSearchParams = z.infer<typeof TheatreDetailsSearchParamSchema>;