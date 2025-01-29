import {z, ZodType} from "zod";
import ISeatMap from "@/pages/seatmap/interfaces/ISeatMap.ts";
import {IDString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import {SeatSchema} from "@/pages/seats/schema/SeatSchema.ts";
import {ShowingSchema} from "@/pages/showings/schema/ShowingSchema.ts";

/**
 * Zod schema for validating a `SeatMap` object.
 *
 * This schema defines the structure and validation rules for a `SeatMap` object.
 */
export const SeatMapSchema: ZodType<ISeatMap> = z.object({
    _id: IDString,

    isAvailable: RequiredBoolean,

    isReserved: RequiredBoolean,

    price: RequiredNumber
        .gt(0, "Must be greater than 0."),

    seat: z
        .union([IDString, z.lazy(() => SeatSchema)]),

    showing: z
        .union([IDString, z.lazy(() => ShowingSchema)]),
});

/**
 * Zod schema for validating an array of `SeatMap` object.
 *
 * This schema defines the structure and validation rules
 * for an array of `SeatMap` objects.
 */
export const SeatMapArraySchema = z.array(SeatMapSchema);

/**
 * Represents a single `Showing` object, inferred from `ShowingSchema`.
 */
export type SeatMap = z.infer<typeof SeatMapSchema>;

/**
 * Represents an array of `SeatMap` object, inferred from `SeatMapArraySchema`.
 */
export type SeatMapArray = z.infer<typeof SeatMapArraySchema>;