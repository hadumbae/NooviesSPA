import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import { SeatMapStatusEnum } from "@/pages/seatmap/schema/enum/SeatMapStatusEnum.ts";
import {ShowingDetailsSchema} from "@/pages/showings/schema/showing/Showing.schema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import { generatePaginationSchema } from "@/common/utility/schemas/generatePaginationSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { SeatDetailsSchema } from "@/pages/seats/schema/seat/SeatDetails.schema.ts";

/**
 * @summary
 * Base Zod schema for a SeatMap entity.
 *
 * @description
 * Represents a seat’s pricing and availability within a specific showing.
 * Stores only ObjectId references for relational fields.
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
 * @summary
 * Array schema for SeatMap entities.
 */
export const SeatMapArraySchema = generateArraySchema(SeatMapSchema);

/**
 * @summary
 * Paginated schema for SeatMap results.
 */
export const PaginatedSeatMapSchema = generatePaginationSchema(SeatMapSchema);

/**
 * @summary
 * Detailed SeatMap schema with populated relations.
 *
 * @description
 * - Replaces ObjectId references with populated `Seat` and `Showing` objects.
 * - Adds positional metadata (`x`, `y`, `row`) and a computed `finalPrice` field.
 */
export const SeatMapDetailsSchema = SeatMapSchema.extend({
    seat: z.lazy(() => SeatDetailsSchema),
    showing: z.lazy(() => ShowingDetailsSchema),
    x: PositiveNumberSchema,
    y: PositiveNumberSchema,
    row: NonEmptyStringSchema.max(10, "Must be 10 characters or less."),
    finalPrice: PositiveNumberSchema,
});

/**
 * @summary
 * Array schema for detailed SeatMap entities.
 */
export const SeatMapDetailsArraySchema = generateArraySchema(SeatMapDetailsSchema);

/**
 * @summary
 * Paginated schema for detailed SeatMap results.
 */
export const PaginatedSeatMapDetailsSchema = generatePaginationSchema(SeatMapDetailsSchema);
