import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { CleanedPositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { z } from "zod";
import { SeatMapStatusEnum } from "@/pages/seatmap/schema/enum/SeatMapStatusEnum.ts";
import { SeatSchema } from "@/pages/seats/schema/seat/Seat.schema.ts";
import { ShowingSchema } from "@/pages/showings/schema/showing/Showing.schema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import { generatePaginationSchema } from "@/common/utility/schemas/generatePaginationSchema.ts";

// ⚡ Seat Map ⚡

/**
 * Zod schema representing a SeatMap entity.
 *
 * Fields:
 * - `_id`: Object ID of the seat map.
 * - `seat`: Object ID of the related Seat.
 * - `showing`: Object ID of the related Showing.
 * - `price`: Positive numeric price for this seat map entry.
 * - `status`: Current status of the seat map (AVAILABLE, UNAVAILABLE, etc.).
 */
export const SeatMapSchema = z.object({
    _id: IDStringSchema,
    seat: IDStringSchema,
    showing: IDStringSchema,
    price: CleanedPositiveNumberSchema,
    status: SeatMapStatusEnum,
});

/**
 * Array schema for multiple SeatMap entries.
 */
export const SeatMapArraySchema = generateArraySchema(SeatMapSchema);

/**
 * Paginated schema for SeatMap results.
 */
export const PaginatedSeatMapSchema = generatePaginationSchema(SeatMapSchema);

// ⚡ Seat Map Details ⚡

/**
 * Detailed SeatMap schema with populated references.
 *
 * Extends `SeatMapSchema` by replacing `seat` and `showing` IDs with full objects.
 */
export const SeatMapDetailsSchema = SeatMapSchema.extend({
    seat: z.lazy(() => SeatSchema),
    showing: z.lazy(() => ShowingSchema),
});

/**
 * Array schema for multiple SeatMap details.
 */
export const SeatMapDetailsArraySchema = generateArraySchema(SeatMapDetailsSchema);

/**
 * Paginated schema for detailed SeatMap results.
 */
export const PaginatedSeatMapDetailsSchema = generatePaginationSchema(SeatMapDetailsSchema);
