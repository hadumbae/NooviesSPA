import {z} from "zod";
import {
    PaginatedTheatreDetailsSchema,
    PaginatedTheatreSchema,
    TheatreArraySchema,
    TheatreDetailsSchema,
    TheatreSchema
} from "@/pages/theatres/schema/model/theatre/Theatre.schema.ts";

/**
 * Type representing a single theatre object as defined by {@link TheatreSchema}.
 *
 * Includes basic theatre data: ID, name, location, and seat capacity.
 * Corresponds to the `ITheatre` interface.
 */
export type Theatre = z.infer<typeof TheatreSchema>;

/**
 * Type representing a detailed theatre object as defined by {@link TheatreDetailsSchema}.
 *
 * Includes all base fields, plus associated screens and seats.
 * Corresponds to the `ITheatreDetails` interface.
 */
export type TheatreDetails = z.infer<typeof TheatreDetailsSchema>;

/**
 * Type representing an array of theatre objects.
 *
 * Based on an array of {@link TheatreSchema} objects.
 */
export type TheatreArray = z.infer<typeof TheatreArraySchema>;

/**
 * Type representing a paginated response of theatres.
 *
 * Includes pagination metadata (e.g., total count, current page, items per page)
 * along with an array of {@link Theatre} objects.
 */
export type PaginatedTheatres = z.infer<typeof PaginatedTheatreSchema>;

/**
 * Type representing a paginated response of detailed theatres.
 *
 * Similar to {@link PaginatedTheatres}, but each item includes full details
 * (e.g., screens, seats) as defined by {@link TheatreDetails}.
 */
export type PaginatedTheatreDetails = z.infer<typeof PaginatedTheatreDetailsSchema>;