import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {CoercedNumberValueSchema} from "@/common/schema/numbers/number-value/CoercedNumberValueSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";

/**
 * Zod schema for validating a `SeatMap` object.
 *
 * This schema defines the structure and validation rules for a `SeatMap` object.
 */
export default z.object({
    _id: IDStringSchema,

    isAvailable: CoercedBooleanValueSchema,

    isReserved: CoercedBooleanValueSchema,

    price: CoercedNumberValueSchema
        .gt(0, "Must be greater than 0."),
});