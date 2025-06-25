import {z} from "zod";
import {
    PaginatedTheatreSchema,
    TheatreArraySchema,
    TheatreDetailsSchema,
    TheatreSchema
} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";

/**
 * Type representing a single theatre object as defined by `TheatreSchema`.
 *
 * Includes basic theatre data: ID, name, location, and seat capacity.
 * Corresponds to the `ITheatre` interface.
 */
export type Theatre = z.infer<typeof TheatreSchema>;

/**
 * Type representing a detailed theatre object as defined by `TheatreDetailsSchema`.
 *
 * Includes all base fields, plus associated screens and seats.
 * Corresponds to the `ITheatreDetails` interface.
 */
export type TheatreDetails = z.infer<typeof TheatreDetailsSchema>;

/**
 * Type representing an array of theatre objects.
 *
 * Based on an array of `TheatreSchema` objects.
 */
export type TheatreArray = z.infer<typeof TheatreArraySchema>;

/**
 * Type representing a paginated response of theatres.
 *
 * Includes pagination metadata (e.g. total, page, limit)
 * along with an array of `Theatre` objects.
 */
export type PaginatedTheatres = z.infer<typeof PaginatedTheatreSchema>;