import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {SeatTypeEnum} from "@/pages/seats/schema/SeatType.enum.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";

/**
 * Zod schema for validating seat filter query parameters.
 *
 * This schema defines optional filters that can be used to query seat data.
 * Each field corresponds to a filterable property of a seat record.
 */
export const SeatQueryFilterSchema = z.object({
    _id: IDStringSchema.optional(),
    row: NonEmptyStringSchema.optional(),
    seatNumber: NonEmptyStringSchema.optional(),
    seatType: SeatTypeEnum.optional(),
    isAvailable: RequiredBoolean.optional(),
    priceMultiplier: PositiveNumberSchema.optional(),
    theatre: IDStringSchema.optional(),
    screen: IDStringSchema.optional(),
});

/**
 * Schema for sorting seats in a query.
 *
 * Supports ascending (`1`, `"asc"`, `"ascending"`) and descending (`-1`, `"desc"`, `"descending"`) values.
 * All fields are optional.
 */
export const SeatQuerySortSchema = z.object({
    row: MongooseSortOrderSchema.optional(),
    seatNumber: MongooseSortOrderSchema.optional(),
    seatType: MongooseSortOrderSchema.optional(),
    isAvailable: MongooseSortOrderSchema.optional(),
    priceMultiplier: MongooseSortOrderSchema.optional(),
    theatre: MongooseSortOrderSchema.optional(),
    screen: MongooseSortOrderSchema.optional(),
});


