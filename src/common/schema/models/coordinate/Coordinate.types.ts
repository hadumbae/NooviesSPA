import {z} from "zod";
import {CoordinateSchema, LatitudeSchema, LongitudeSchema} from "@/common/schema/models/coordinate/Coordinate.schema.ts";

/**
 * @public
 * A geographic longitude in decimal degrees.
 *
 * Must be between -180 (west) and +180 (east), inclusive.
 */
export type Longitude = z.infer<typeof LongitudeSchema>;

/**
 * @public
 * A geographic latitude in decimal degrees.
 *
 * Must be between -90 (south) and +90 (north), inclusive.
 */
export type Latitude = z.infer<typeof LatitudeSchema>;

/**
 * @public
 * A geographic coordinate pair of latitude and longitude.
 *
 * Represents a point on the Earth’s surface:
 * - `latitude`: north/south position (see {@link Latitude})
 * - `longitude`: east/west position (see {@link Longitude})
 */
export type Coordinate = z.infer<typeof CoordinateSchema>;