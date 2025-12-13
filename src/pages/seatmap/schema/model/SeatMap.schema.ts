import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { SeatMapStatusEnum } from "@/pages/seatmap/schema/enum/SeatMapStatusEnum.ts";
import { SeatSchema } from "@/pages/seats/schema/seat/Seat.schema.ts";
import { ShowingSchema } from "@/pages/showings/schema/showing/Showing.schema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import { generatePaginationSchema } from "@/common/utility/schemas/generatePaginationSchema.ts";

/**
 * @summary Zod schema representing a SeatMap entity.
 *
 * @description
 * Validates the core fields of a seat map, linking a seat to a specific showing
 * and defining pricing and status.
 *
 * @fields
 * - `_id` — ObjectId of the seat map entry.
 * - `seat` — ObjectId reference to the related Seat.
 * - `showing` — ObjectId reference to the related Showing.
 * - `basePrice` — Base price of the seat map entry.
 * - `priceMultiplier` — Multiplier applied to the base price.
 * - `overridePrice` — Optional override price.
 * - `status` — Current seat map status (`AVAILABLE`, `UNAVAILABLE`, etc.).
 */
export const SeatMapSchema = z.object({
    _id: IDStringSchema,
    seat: IDStringSchema,
    showing: IDStringSchema,
    basePrice: PositiveNumberSchema,
    priceMultiplier: PositiveNumberSchema,
    overridePrice: PositiveNumberSchema.optional(),
    status: SeatMapStatusEnum,
});

/**
 * @summary Array schema for multiple SeatMap entries.
 */
export const SeatMapArraySchema = generateArraySchema(SeatMapSchema);

/**
 * @summary Paginated schema for SeatMap results.
 */
export const PaginatedSeatMapSchema = generatePaginationSchema(SeatMapSchema);

/**
 * @summary Detailed SeatMap schema with populated references.
 *
 * @description
 * Extends `SeatMapSchema` by replacing the `seat` and `showing` ObjectId fields
 * with the full populated objects, and adds a computed `finalPrice` field
 * representing the effective price of the seat.
 *
 * @fields
 * - `seat` — Full populated Seat object.
 * - `showing` — Full populated Showing object.
 * - `finalPrice` — Computed price: `overridePrice` if present, otherwise `basePrice * priceMultiplier`.
 */
export const SeatMapDetailsSchema = SeatMapSchema.extend({
    seat: z.lazy(() => SeatSchema),
    showing: z.lazy(() => ShowingSchema),
    finalPrice: PositiveNumberSchema,
});

/**
 * @summary Array schema for multiple detailed SeatMap entries.
 */
export const SeatMapDetailsArraySchema = generateArraySchema(SeatMapDetailsSchema);

/**
 * @summary Paginated schema for detailed SeatMap results.
 */
export const PaginatedSeatMapDetailsSchema = generatePaginationSchema(SeatMapDetailsSchema);
