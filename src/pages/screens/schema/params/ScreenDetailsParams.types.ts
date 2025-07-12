import {z} from "zod";
import {
    ScreenDetailsParamsSchema,
    ScreenDetailsSearchParamsSchema
} from "@/pages/screens/schema/params/ScreenDetailsParamsSchema.ts";

/**
 * Type representing the parameters required to identify a specific theatre screen.
 *
 * Typically used in route parameters or API calls that require both `theatreID` and `screenID`.
 */
export type ScreenDetailsParams = z.infer<typeof ScreenDetailsParamsSchema>;

/**
 * Type representing search and pagination parameters for viewing seat or showing data
 * associated with a specific theatre screen.
 *
 * Includes information like which tab is active, current page, and number of items per page.
 */
export type ScreenDetailsSearchParams = z.infer<typeof ScreenDetailsSearchParamsSchema>;