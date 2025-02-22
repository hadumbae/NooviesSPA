import {z} from "zod";
import {IDString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";

/**
 * Zod schema for validating a `SeatMap` object.
 *
 * This schema defines the structure and validation rules for a `SeatMap` object.
 */
export default z.object({
    _id: IDString,

    isAvailable: RequiredBoolean,

    isReserved: RequiredBoolean,

    price: RequiredNumber
        .gt(0, "Must be greater than 0."),
});