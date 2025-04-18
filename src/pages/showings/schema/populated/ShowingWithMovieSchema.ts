import {z, ZodType} from "zod";
import {IDString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {TheatreSchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import {ScreenSchema} from "@/pages/screens/schema/base/ScreenSchema.ts";
import {MovieSchema} from "@/pages/movies/schema/MovieSchema.ts";
import {SeatMapSchema} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import ShowingBaseSchema from "@/pages/showings/schema/base/ShowingBaseSchema.ts";
import IShowingWithMovie from "@/pages/showings/interfaces/populated/IShowingWithMovie.ts";

/**
 * Zod schema for validating a `Showing` object.
 *
 * This schema defines the structure and validation rules for a `Showing` object.
 */
export const ShowingWithMovieSchema: ZodType<IShowingWithMovie> = ShowingBaseSchema.extend({
    movie: z.lazy(() => MovieSchema),
    theatre: z.union([IDString, z.lazy(() => TheatreSchema)]),
    screen: z.union([IDString, z.lazy(() => ScreenSchema)]),
    seating: z.array(z.union([IDString, z.lazy(() => SeatMapSchema)])),
});

/**
 * Represents a single `Showing` object, inferred from `ShowingSchema`.
 */
export type ShowingWithMovie = z.infer<typeof ShowingWithMovieSchema>;