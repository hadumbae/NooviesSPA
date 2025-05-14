import {z} from "zod";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";

/**
 * Zod schema for validating a `SeatMap` object.
 *
 * This schema defines the structure and validation rules for a `SeatMap` object.
 */
export default z.object({
    _id: IDStringSchema,

    isAvailable: RequiredBoolean,

    isReserved: RequiredBoolean,

    price: RequiredNumberSchema
        .gt(0, "Must be greater than 0."),
});