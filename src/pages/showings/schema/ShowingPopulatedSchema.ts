import {z, ZodType} from 'zod';
import IPopulatedShowing from "@/pages/showings/interfaces/IPopulatedShowing.ts";
import {MovieSchema} from "@/pages/movies/schema/MovieSchema.ts";
import {ScreenSchema} from "@/pages/screens/schema/ScreenSchema.ts";
import {TheatreSchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import ShowingBaseSchema from "@/pages/showings/schema/ShowingBaseSchema.ts";

export const ShowingPopulatedSchema: ZodType<IPopulatedShowing> = ShowingBaseSchema.extend({
    movie: z.lazy(() => MovieSchema),
    screen: z.lazy(() => ScreenSchema),
    theatre: z.lazy(() => TheatreSchema),
});

export type PopulatedShowing = z.infer<typeof ShowingPopulatedSchema>;