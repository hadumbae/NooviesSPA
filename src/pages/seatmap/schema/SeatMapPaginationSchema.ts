import {z} from "zod";
import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";
import {SeatMapSchema} from "@/pages/seatmap/schema/SeatMapSchema.ts";


/**
 * Zod schema for validating a paginated response of movies.
 *
 * This schema defines the structure of paginated seat map data received
 * from an API. It includes the total number of items and the list of seat
 * maps on the current page.
 */
export const PaginatedSeatMapSchema = generatePaginationSchema(SeatMapSchema);

/**
 * Represents the TypeScript type inferred from `PaginatedSeatMapSchema`.
 *
 * This type is used to enforce the structure of paginated seat map
 * data throughout the application.
 */
export type PaginatedSeatMaps = z.infer<typeof PaginatedSeatMapSchema>;