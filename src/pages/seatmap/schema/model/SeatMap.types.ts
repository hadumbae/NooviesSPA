import {
    PaginatedSeatMapDetailsSchema,
    PaginatedSeatMapSchema,
    SeatMapArraySchema,
    SeatMapDetailsArraySchema,
    SeatMapDetailsSchema,
    SeatMapSchema
} from "@/pages/seatmap/schema/model/SeatMap.schema.ts";
import { z } from "zod";

/**
 * Type representing a single SeatMap document.
 */
export type SeatMap = z.infer<typeof SeatMapSchema>;

/**
 * Type representing an array of SeatMap documents.
 */
export type SeatMapArray = z.infer<typeof SeatMapArraySchema>;

/**
 * Type representing a detailed SeatMap document
 * with populated `seat` and `showing` references.
 */
export type SeatMapDetails = z.infer<typeof SeatMapDetailsSchema>;

/**
 * Type representing an array of detailed SeatMap documents.
 */
export type SeatMapDetailsArray = z.infer<typeof SeatMapDetailsArraySchema>;

/**
 * Type representing paginated SeatMap results.
 */
export type PaginatedSeatMaps = z.infer<typeof PaginatedSeatMapSchema>;

/**
 * Type representing paginated detailed SeatMap results.
 */
export type PaginatedSeatMapDetails = z.infer<typeof PaginatedSeatMapDetailsSchema>;
