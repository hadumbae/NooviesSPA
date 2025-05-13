import {z, ZodType} from "zod";
import ISeatMap from "@/pages/seatmap/interfaces/ISeatMap.ts";
import {SeatSchema} from "@/pages/seats/schema/SeatSchema.ts";
import {ShowingSchema} from "@/pages/showings/schema/base/ShowingSchema.ts";
import SeatMapBaseSchema from "@/pages/seatmap/schema/SeatMapBaseSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";

/**
 * Zod schema for validating a `SeatMap` object.
 *
 * This schema defines the structure and validation rules for a `SeatMap` object.
 */
export const SeatMapSchema: ZodType<ISeatMap> = SeatMapBaseSchema.extend({
    seat: z
        .union([
            IDStringSchema,
            z.lazy(() => SeatSchema),
        ]),

    showing: z
        .union([
            IDStringSchema,
            z.lazy(() => ShowingSchema),
        ]),
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