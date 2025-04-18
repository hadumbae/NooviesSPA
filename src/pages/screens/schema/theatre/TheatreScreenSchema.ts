import {z, ZodType} from "zod";
import {IDString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {TheatreSchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import {SeatSchema} from "@/pages/seats/schema/SeatSchema.ts";
import {ScreenBaseSchema} from "@/pages/screens/schema/base/ScreenBaseSchema.ts";
import {ShowingWithMovieSchema} from "@/pages/showings/schema/populated/ShowingWithMovieSchema.ts";
import ITheatreScreen from "@/pages/screens/interfaces/ITheatreScreen.ts";

/**
 * Schema for a theatre screen, extending the base screen schema with additional properties:
 *
 * - `theatre`: Either an ID string or a full `Theatre` object.
 * - `seats`: An array containing either ID strings or full `Seat` objects.
 * - `showings`: An array of `ShowingWithMovies` objects.
 *
 * This schema is used to validate and infer the `ITheatreScreen` type.
 */
export const TheatreScreenSchema: ZodType<ITheatreScreen> = ScreenBaseSchema.extend({
    theatre: z.union([IDString, z.lazy(() => TheatreSchema)]),
    seats: z.array(z.union([IDString, z.lazy(() => SeatSchema)])),
    showings: z.array(z.lazy(() => ShowingWithMovieSchema)),
});

export const TheatreScreenArraySchema = z.array(TheatreScreenSchema);

export type TheatreScreen = z.infer<typeof TheatreScreenSchema>;

export type TheatreScreenArray = z.infer<typeof TheatreScreenArraySchema>