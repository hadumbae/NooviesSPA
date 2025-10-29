import {z} from "zod";
import {CoercedNumberValueSchema} from "@/common/schema/numbers/number-value/CoercedNumberValueSchema.ts";

/**
 * A schema for validating longitude values.
 * Longitude represents the east-west position and must be a number between -180 and 180.
 */
export const LongitudeSchema = CoercedNumberValueSchema
    .min(-180, {message: "Longitude must be greater than or equal -180."})
    .max(180, {message: "Longitude must be less than or equal 180."});

/**
 * A schema for validating latitude values.
 * Latitude represents the north-south position and must be a number between -90 and 90.
 */
export const LatitudeSchema = CoercedNumberValueSchema
    .min(-90, {message: "Latitude must be greater than or equal -90."})
    .max(90, {message: "Latitude must be less than or equal 90."});

/**
 * A GeoJSON Point schema for validating coordinate pairs.
 * - type: Must be the literal string "Point".
 * - coordinates: A tuple [longitude, latitude] validated by LongitudeSchema and LatitudeSchema.
 */
export const CoordinateSchema = z.object({
    /**
     * The GeoJSON geometry type. Must be "Point" for coordinate pairs.
     */
    type: z.literal("Point").describe("GeoJSON geometry type; must be `Point`."),

    /**
     * The coordinate pair as [longitude, latitude].
     */
    coordinates: z.tuple(
        [LongitudeSchema, LatitudeSchema],
        {
            required_error: "Required!",
            invalid_type_error: "Invalid coordinates. Must be an array of two coordinate points.",
            message: "Invalid coordinates.",
        },
    ).describe("[longitude, latitude]"),
});