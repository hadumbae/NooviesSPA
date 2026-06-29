/**
 * @fileoverview Zod schemas and types for filtering and sorting SeatMap documents.
 */

import {z} from "zod";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {SeatMapStatusSchema} from "@/domains/seatmaps/_schema/fields";

/**
 * Zod schema for filtering SeatMap documents by showing, seat, price, or status.
 */
export const SeatMapMatchFilterSchema = z.object({
    showing: IDStringSchema.optional(),
    seat: IDStringSchema.optional(),
    price: PositiveNumberSchema.optional(),
    status: SeatMapStatusSchema.optional(),
});

/**
 * Zod schema for sorting SeatMap documents by price or status.
 */
export const SeatMapMatchSortSchema = z.object({
    sortByPrice: MongooseSortOrderSchema.optional(),
    sortByStatus: MongooseSortOrderSchema.optional(),
});

/**
 * Combined Zod schema for SeatMap match filters and sort orders.
 */
export const SeatMapMatchOptionsSchema =
    SeatMapMatchFilterSchema.merge(SeatMapMatchSortSchema);

/**
 * TypeScript type for SeatMap match parameters inferred from SeatMapMatchParamSchema.
 */
export type SeatMapMatchOptions = z.infer<typeof SeatMapMatchOptionsSchema>;
