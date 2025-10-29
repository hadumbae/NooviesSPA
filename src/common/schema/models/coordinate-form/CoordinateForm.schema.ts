import {z} from "zod";
import {LatitudeSchema, LongitudeSchema} from "@/common/schema/models/coordinate/Coordinate.schema.ts";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";

/**
 * 🔧 Initial value schema for coordinate form inputs.
 *
 * Used to populate controlled inputs before validation,
 * allowing empty strings or other starter values.
 *
 * @public
 */
export const CoordinateFormValueSchema = z.object({
    /** GeoJSON geometry type; always `"Point"` for a single coordinate pair. */
    type: z.literal("Point").default("Point"),

    /** Initial latitude/longitude input values as strings (e.g., `["", ""]`). */
    coordinates: z.tuple([FormStarterValueSchema, FormStarterValueSchema]),
});

/**
 * 🧹 Cleaned longitude input schema.
 *
 * Wraps `LongitudeSchema` to trim and parse string inputs into numbers,
 * then validates that result as a valid longitude.
 *
 * @internal
 */
const LongitudeFormSchema = preprocessEmptyStringToUndefined(LongitudeSchema);

/**
 * 🧹 Cleaned latitude input schema.
 *
 * Wraps `LatitudeSchema` to trim and parse string inputs into numbers,
 * then validates that result as a valid latitude.
 *
 * @internal
 */
const LatitudeFormSchema = preprocessEmptyStringToUndefined(LatitudeSchema);

/**
 * 🌐 Zod schema for validating coordinate form submissions.
 *
 * Ensures a valid GeoJSON `Point` type and a tuple of
 * `[longitude, latitude]` numbers, with custom error messages.
 *
 * @public
 */
export const CoordinateFormSchema = z.object({
    /**
     * GeoJSON geometry type; must be `"Point"`.
     *
     * @default "Point"
     */
    type: z
        .literal("Point")
        .default("Point")
        .describe("GeoJSON geometry type; must be `Point`."),

    /**
     * Tuple of cleaned `[longitude, latitude]` values:
     * - Longitude: valid number between -180 and 180.
     * - Latitude: valid number between -90 and 90.
     *
     * @throws if not exactly two numeric values or out of range.
     */
    coordinates: z
        .tuple(
            [LongitudeFormSchema, LatitudeFormSchema],
            {
                required_error: "Required!",
                invalid_type_error: "Invalid coordinates. Must be an array of two coordinate points.",
                message: "Invalid coordinates.",
            },
        )
        .describe("[longitude, latitude]"),
});