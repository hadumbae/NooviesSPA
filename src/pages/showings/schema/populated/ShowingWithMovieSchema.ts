import {z, ZodType} from "zod";
import {TheatreSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import {ScreenSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import {MovieSchema} from "@/pages/movies/schema/model/MovieSchema.ts";
import {SeatMapSchema} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import ShowingBaseSchema from "@/pages/showings/schema/base/ShowingBaseSchema.ts";
import IShowingWithMovie from "@/pages/showings/interfaces/populated/IShowingWithMovie.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";

/**
 * Zod schema for validating a `Showing` object.
 *
 * This schema defines the structure and validation rules for a `Showing` object.
 */
export const ShowingWithMovieSchema: ZodType<IShowingWithMovie> = ShowingBaseSchema.extend({
    movie: z.lazy(() => MovieSchema),
    theatre: z.union([IDStringSchema, z.lazy(() => TheatreSchema)]),
    screen: z.union([IDStringSchema, z.lazy(() => ScreenSchema)]),
    seating: z.array(z.union([IDStringSchema, z.lazy(() => SeatMapSchema)])),
});

/**
 * Represents a single `Showing` object, inferred from `ShowingSchema`.
 */
export type ShowingWithMovie = z.infer<typeof ShowingWithMovieSchema>;