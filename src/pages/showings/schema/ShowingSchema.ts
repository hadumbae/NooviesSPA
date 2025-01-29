import {z, ZodType} from "zod";
import {IDString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {TheatreSchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import {ScreenSchema} from "@/pages/screens/schema/ScreenSchema.ts";
import {MovieSchema} from "@/pages/movies/schema/MovieSchema.ts";
import IShowing from "@/pages/showings/interfaces/IShowing.ts";
import {SeatMapSchema} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import ShowingBaseSchema from "@/pages/showings/schema/ShowingBaseSchema.ts";

/**
 * Zod schema for validating a `Showing` object.
 *
 * This schema defines the structure and validation rules for a `Showing` object.
 */
export const ShowingSchema: ZodType<IShowing> = ShowingBaseSchema.extend({
    movie: z
        .union([IDString, z.lazy(() => MovieSchema)]),

    theatre: z
        .union([IDString, z.lazy(() => TheatreSchema)]),

    screen: z
        .union([IDString, z.lazy(() => ScreenSchema)]),

    seating: z
        .array(z.union([IDString, z.lazy(() => SeatMapSchema)])),
});

/**
 * Zod schema for validating an array of `Showing` object.
 *
 * This schema defines the structure and validation rules
 * for an array of `Showing` objects.
 */
export const ShowingArraySchema = z.array(ShowingSchema);

/**
 * Represents a single `Showing` object, inferred from `ShowingSchema`.
 */
export type Showing = z.infer<typeof ShowingSchema>;

/**
 * Represents an array of `Showing` object, inferred from `ShowingArraySchema`.
 */
export type ShowingArray = z.infer<typeof ShowingArraySchema>;