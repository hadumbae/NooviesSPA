import {z} from "zod";
import {
    TheatreScreenParamsSchema,
    TheatreScreenSearchParamsSchema
} from "@/pages/screens/schema/params/TheatreScreenParams.schema.ts";

/**
 * Type representing the parameters required to identify a specific theatre screen.
 *
 * Typically used in route parameters or API calls that require both `theatreID` and `screenID`.
 */
export type TheatreScreenParams = z.infer<typeof TheatreScreenParamsSchema>;

/**
 * Type representing search and pagination parameters for viewing seat or showing data
 * associated with a specific theatre screen.
 *
 * Includes information like which tab is active, current page, and number of items per page.
 */
export type TheatreScreenSearchParams = z.infer<typeof TheatreScreenSearchParamsSchema>;