/**
 * @file SeatMap.schema.ts
 * Showing-scoped seat pricing and availability schemas.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {SeatMapStatusEnum} from "@/pages/seatmap/schema/enum/SeatMapStatusEnum.ts";
import {PopulatedShowingSchema, ShowingSchema} from "@/pages/showings/schema/showing/Showing.schema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {SeatDetailsSchema} from "@/pages/seats/schema/seat/SeatDetails.schema.ts";
import {SeatingStructureSchema} from "@/pages/seats/schema/seat/Seat.schema.ts";

/** Reservation and pricing state for a seat within a showing. */
export const SeatMapSchema = z.object({
    _id: IDStringSchema,
    seat: IDStringSchema,
    reservation: IDStringSchema.nullable().optional(),
    showing: IDStringSchema,
    basePrice: PositiveNumberSchema,
    priceMultiplier: PositiveNumberSchema,
    overridePrice: PositiveNumberSchema.optional(),
    status: SeatMapStatusEnum,
});

/** SeatMap with populated layout structure. */
export const SeatMapWithSeatSchema = SeatMapSchema.extend({
    seat: z.lazy(() => SeatingStructureSchema),
});

/** SeatMap with populated showing. */
export const PopulatedSeatMapSchema = SeatMapWithSeatSchema.extend({
    showing: z.lazy(() => ShowingSchema),
});

/** Layout-facing SeatMap variant with positional data. */
export const SeatMapDetailsSchema = SeatMapSchema.extend({
    seat: z.lazy(() => SeatDetailsSchema),
    showing: z.lazy(() => PopulatedShowingSchema),
    x: PositiveNumberSchema,
    y: PositiveNumberSchema,
    row: NonEmptyStringSchema.max(10, "Must be 10 characters or less."),
    seatLabel: NonEmptyStringSchema.optional(),
    finalPrice: PositiveNumberSchema,
});

/** SeatMap collection schema. */
export const SeatMapArraySchema =
    generateArraySchema(SeatMapSchema);

/** Detailed SeatMap collection schema. */
export const SeatMapDetailsArraySchema =
    generateArraySchema(SeatMapDetailsSchema);

/** Paginated SeatMap response schema. */
export const PaginatedSeatMapSchema =
    generatePaginationSchema(SeatMapSchema);

/** Paginated detailed SeatMap response schema. */
export const PaginatedSeatMapDetailsSchema =
    generatePaginationSchema(SeatMapDetailsSchema);
