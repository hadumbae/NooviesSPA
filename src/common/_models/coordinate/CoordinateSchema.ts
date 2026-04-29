/** @fileoverview Zod schema and type definition for GeoJSON Point coordinates. */

import {z} from "zod";
import {LongitudeSchema} from "@/common/_models/coordinate/LongitudeSchema.ts";
import {LatitudeSchema} from "@/common/_models/coordinate/LatitudeSchema.ts";

/** GeoJSON Point schema for validating coordinate pairs. */
export const CoordinateSchema = z.object({
    type: z.literal("Point"),
    coordinates: z.tuple(
        [LongitudeSchema, LatitudeSchema],
        {
            required_error: "Required!",
            invalid_type_error: "Invalid coordinates. Must be an array of two coordinate points.",
            message: "Invalid coordinates.",
        },
    ),
});

/** A geographic coordinate pair representing a point on the Earth's surface. */
export type Coordinate = z.infer<typeof CoordinateSchema>;