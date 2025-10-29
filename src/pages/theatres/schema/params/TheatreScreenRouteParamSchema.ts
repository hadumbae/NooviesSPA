import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Schema for identifying a specific screen within a theatre.
 *
 * Used when both `theatreID` and `screenID` are required to reference a screen.
 */
export const TheatreScreenRouteParamSchema = z.object({
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
 * Type representing the parameters required to identify a specific theatre screen.
 *
 * Typically used in route parameters or API calls that require both `theatreID` and `screenID`.
 */
export type TheatreScreenRouteParams = z.infer<typeof TheatreScreenRouteParamSchema>;