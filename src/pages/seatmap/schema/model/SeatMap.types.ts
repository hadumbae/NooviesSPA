/**
 * @file SeatMap.types.ts
 *
 * TypeScript types inferred from SeatMap Zod schemas.
 *
 * Provides strongly typed representations of seat map data
 * derived directly from runtime-validated schemas.
 */

import {
    PaginatedSeatMapDetailsSchema,
    PaginatedSeatMapSchema,
    PopulatedSeatMapSchema,
    SeatMapArraySchema,
    SeatMapDetailsArraySchema,
    SeatMapDetailsSchema,
    SeatMapSchema,
    SeatMapWithSeatSchema,
} from "@/pages/seatmap/schema/model/SeatMap.schema.ts";
import {z} from "zod";

/**
 * Base SeatMap type.
 *
 * @remarks
 * ObjectId-backed representation of a seat map entry,
 * including pricing and availability metadata.
 */
export type SeatMap =
    z.infer<typeof SeatMapSchema>;

/** Array of base SeatMap entries. */
export type SeatMapArray =
    z.infer<typeof SeatMapArraySchema>;

/**
 * SeatMap with populated seat relation.
 */
export type SeatMapWithSeat =
    z.infer<typeof SeatMapWithSeatSchema>;

/**
 * SeatMap with populated seat and showing relations.
 */
export type PopulatedSeatMap =
    z.infer<typeof PopulatedSeatMapSchema>;

/**
 * Detailed SeatMap representation.
 *
 * @remarks
 * Includes layout coordinates, populated relations,
 * and a computed final price.
 */
export type SeatMapDetails =
    z.infer<typeof SeatMapDetailsSchema>;

/** Array of detailed SeatMap entries. */
export type SeatMapDetailsArray =
    z.infer<typeof SeatMapDetailsArraySchema>;

/**
 * Paginated SeatMap response.
 */
export type PaginatedSeatMaps =
    z.infer<typeof PaginatedSeatMapSchema>;

/**
 * Paginated detailed SeatMap response.
 */
export type PaginatedSeatMapDetails =
    z.infer<typeof PaginatedSeatMapDetailsSchema>;
