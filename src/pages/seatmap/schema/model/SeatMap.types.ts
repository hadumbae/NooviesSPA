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
 * @summary Type representing a single SeatMap document.
 *
 * @description
 * Inferred from `SeatMapSchema`. Represents a basic seat map entry linking a
 * seat to a showing, including pricing and status information.
 */
export type SeatMap = z.infer<typeof SeatMapSchema>;

/**
 * @summary Type representing an array of SeatMap documents.
 *
 * @description
 * Inferred from `SeatMapArraySchema`. Used when handling multiple seat map
 * entries in bulk operations or query results.
 */
export type SeatMapArray = z.infer<typeof SeatMapArraySchema>;

/**
 * @summary Type representing a detailed SeatMap document with populated references.
 *
 * @description
 * Inferred from `SeatMapDetailsSchema`. Replaces the `seat` and `showing` IDs
 * with full populated objects and includes a computed `finalPrice` field.
 */
export type SeatMapDetails = z.infer<typeof SeatMapDetailsSchema>;

/**
 * @summary Type representing an array of detailed SeatMap documents.
 *
 * @description
 * Inferred from `SeatMapDetailsArraySchema`. Used when handling multiple
 * detailed seat maps with populated references.
 */
export type SeatMapDetailsArray = z.infer<typeof SeatMapDetailsArraySchema>;

/**
 * @summary Type representing paginated SeatMap results.
 *
 * @description
 * Inferred from `PaginatedSeatMapSchema`. Encapsulates a paginated response
 * for basic seat map entries.
 */
export type PaginatedSeatMaps = z.infer<typeof PaginatedSeatMapSchema>;

/**
 * @summary Type representing paginated detailed SeatMap results.
 *
 * @description
 * Inferred from `PaginatedSeatMapDetailsSchema`. Encapsulates a paginated response
 * for detailed seat map entries with populated references.
 */
export type PaginatedSeatMapDetails = z.infer<typeof PaginatedSeatMapDetailsSchema>;
