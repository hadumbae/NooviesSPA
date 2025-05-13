import {z} from "zod";
import {IDString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {ShowingSchema} from "@/pages/showings/schema/base/ShowingSchema.ts";
import {FavouriteMovieSchema} from "@/pages/movies/schema/client/favourites/FavouriteMovieSchema.ts";

export const FavouriteMovieAndShowingSchema = z.object({
    movie: z.lazy(() => FavouriteMovieSchema),
    showings: z.array(z.union([IDString, z.lazy(() => ShowingSchema)])),
});