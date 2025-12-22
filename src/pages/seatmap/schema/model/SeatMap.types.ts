import {
    PaginatedSeatMapDetailsSchema,
    PaginatedSeatMapSchema,
    PopulatedSeatMapSchema,
    SeatMapArraySchema,
    SeatMapDetailsArraySchema,
    SeatMapDetailsSchema,
    SeatMapSchema,
} from "@/pages/seatmap/schema/model/SeatMap.schema.ts";
import { z } from "zod";

/**
 * @file SeatMap.types.ts
 *
 * @summary
 * TypeScript types inferred from SeatMap Zod schemas.
 *
 * @description
 * Provides strongly typed representations of seat map data derived from
 * runtime-validated Zod schemas. Includes basic, populated, detailed,
 * array, and paginated variants used throughout the application for
 * seat availability, pricing, and layout handling.
 *
 * @module SeatMapTypes
 */

/**
 * Represents a single SeatMap document.
 *
 * @remarks
 * Derived from {@link SeatMapSchema}.
 * Contains ObjectId references to the associated seat and showing,
 * along with pricing and availability status.
 */
export type SeatMap = z.infer<typeof SeatMapSchema>;

/**
 * Represents an array of SeatMap documents.
 *
 * @remarks
 * Derived from {@link SeatMapArraySchema}.
 * Commonly used for bulk seat map queries and list responses.
 */
export type SeatMapArray = z.infer<typeof SeatMapArraySchema>;

/**
 * Represents a SeatMap document with populated relations.
 *
 * @remarks
 * Derived from {@link PopulatedSeatMapSchema}.
 * Replaces the `seat` and `showing` ObjectId references with
 * their corresponding populated documents.
 */
export type PopulatedSeatMap = z.infer<typeof PopulatedSeatMapSchema>;

/**
 * Represents a detailed SeatMap document.
 *
 * @remarks
 * Derived from {@link SeatMapDetailsSchema}.
 * Includes fully populated seat and showing data, positional metadata,
 * and a computed `finalPrice` field.
 */
export type SeatMapDetails = z.infer<typeof SeatMapDetailsSchema>;

/**
 * Represents an array of detailed SeatMap documents.
 *
 * @remarks
 * Derived from {@link SeatMapDetailsArraySchema}.
 * Useful for seat layout views and administrative tooling.
 */
export type SeatMapDetailsArray = z.infer<typeof SeatMapDetailsArraySchema>;

/**
 * Represents a paginated collection of SeatMap documents.
 *
 * @remarks
 * Derived from {@link PaginatedSeatMapSchema}.
 * Intended for paginated API responses returning basic seat map data.
 */
export type PaginatedSeatMaps = z.infer<typeof PaginatedSeatMapSchema>;

/**
 * Represents a paginated collection of detailed SeatMap documents.
 *
 * @remarks
 * Derived from {@link PaginatedSeatMapDetailsSchema}.
 * Intended for paginated API responses requiring fully populated
 * seat and showing information.
 */
export type PaginatedSeatMapDetails = z.infer<typeof PaginatedSeatMapDetailsSchema>;
