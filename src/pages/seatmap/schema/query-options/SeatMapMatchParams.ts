/**
 * @file SeatMapMatchParams.ts
 *
 * @summary
 * Zod schemas and inferred types for SeatMap match filters and sorting.
 *
 * @description
 * Defines query-ready schemas for filtering and sorting SeatMap documents
 * by native SeatMap fields.
 */

import {z} from "zod";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {SeatMapStatusEnum} from "@/pages/seatmap/schema/enum/SeatMapStatusEnum.ts";

/**
 * SeatMap match filter schema.
 */
export const SeatMapMatchFilterSchema = z.object({
    showing: IDStringSchema.optional(),
    seat: IDStringSchema.optional(),
    price: PositiveNumberSchema.optional(),
    status: SeatMapStatusEnum.optional(),
});

/**
 * SeatMap match sort schema.
 */
export const SeatMapMatchSortSchema = z.object({
    sortByPrice: MongooseSortOrderSchema.optional(),
    sortByStatus: MongooseSortOrderSchema.optional(),
});

/**
 * Combined SeatMap match parameter schema.
 */
export const SeatMapMatchParamSchema =
    SeatMapMatchFilterSchema.merge(SeatMapMatchSortSchema);

/**
 * Inferred TypeScript type for SeatMap match parameters.
 */
export type SeatMapMatchParams = z.infer<typeof SeatMapMatchParamSchema>;
