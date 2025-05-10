import {z} from "zod";
import {MovieSchema} from "@/pages/movies/schema/MovieSchema.ts";
import {IDString} from "@/common/schema/helpers/ZodStringHelpers.ts";

export const FavouriteMovieAndShowingSchema = z.object({
    movie: z.lazy(() => MovieSchema),
    showings: z.array(z.union([IDString, z.lazy(() => MovieSchema)])),
});