import {z, ZodType} from 'zod';
import IPopulatedShowing from "@/pages/showings/interfaces/populated/IPopulatedShowing.ts";
import {MovieSchema} from "@/pages/movies/schema/model/MovieSchema.ts";
import {ScreenSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import {TheatreSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import ShowingBaseSchema from "@/pages/showings/schema/base/ShowingBaseSchema.ts";
import {SeatMapSchema} from "@/pages/seatmap/schema/SeatMapSchema.ts";

export const ShowingPopulatedSchema: ZodType<IPopulatedShowing> = ShowingBaseSchema.extend({
    movie: z.lazy(() => MovieSchema),
    screen: z.lazy(() => ScreenSchema),
    theatre: z.lazy(() => TheatreSchema),
    seating: z.array(z.lazy(() => SeatMapSchema)),
});

export type PopulatedShowing = z.infer<typeof ShowingPopulatedSchema>;