import {z, ZodType} from "zod";
import {TheatreSchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import {ScreenSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import {MovieSchema} from "@/pages/movies/schema/model/MovieSchema.ts";
import IShowing from "@/pages/showings/interfaces/IShowing.ts";
import {SeatMapSchema} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import ShowingBaseSchema from "@/pages/showings/schema/base/ShowingBaseSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";

/**
 * Zod schema for validating a `Showing` object.
 *
 * This schema defines the structure and validation rules for a `Showing` object.
 */
export const ShowingSchema: ZodType<IShowing> = ShowingBaseSchema.extend({
    movie: z
        .union([IDStringSchema, z.lazy(() => MovieSchema)]),

    theatre: z
        .union([IDStringSchema, z.lazy(() => TheatreSchema)]),

    screen: z
        .union([IDStringSchema, z.lazy(() => ScreenSchema)]),

    seating: z
        .array(z.union([IDStringSchema, z.lazy(() => SeatMapSchema)])),
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