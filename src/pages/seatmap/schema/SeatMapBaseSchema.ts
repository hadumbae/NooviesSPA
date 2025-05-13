import {z} from "zod";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";

/**
 * Zod schema for validating a `SeatMap` object.
 *
 * This schema defines the structure and validation rules for a `SeatMap` object.
 */
export default z.object({
    _id: IDStringSchema,

    isAvailable: RequiredBoolean,

    isReserved: RequiredBoolean,

    price: RequiredNumber
        .gt(0, "Must be greater than 0."),
});