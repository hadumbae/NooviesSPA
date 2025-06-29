import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {DateStringSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/PositiveNumberSchema.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";

export const ShowingQueryFilterSchema = z.object({
    movie: IDStringSchema.optional(),
    theatre: IDStringSchema.optional(),
    screen: IDStringSchema.optional(),
    startTime: DateStringSchema.optional(),
    endTime: DateStringSchema.optional(),
    ticketPrice: PositiveNumberSchema.optional(),
    isSpecialEvent: RequiredBoolean.optional(),
    isActive: RequiredBoolean.optional(),
});

export const ShowingQuerySortSchema = z.object({
    startTime: MongooseSortOrderSchema.optional(),
    endTime: MongooseSortOrderSchema.optional(),
    ticketPrice: MongooseSortOrderSchema.optional(),
});