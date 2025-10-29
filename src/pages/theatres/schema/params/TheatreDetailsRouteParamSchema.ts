import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";

/**
 * Schema for the route parameters of the theatre details page.
 *
 * @example
 * // Valid route params
 * { theatreID: "abc123" }
 */
export const TheatreDetailsRouteParamSchema = z.object({
    /** The unique identifier of the theatre. */
    theatreID: IDStringSchema,
});

/**
 * Type inferred from {@link TheatreDetailsRouteParamSchema}.
 *
 * Represents the route parameters for the theatre details page.
 */
export type TheatreDetailsRouteParams = z.infer<typeof TheatreDetailsRouteParamSchema>;