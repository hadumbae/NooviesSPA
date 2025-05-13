import {z} from "zod";
import {ShowingSchema} from "@/pages/showings/schema/base/ShowingSchema.ts";
import {FavouriteMovieSchema} from "@/pages/movies/schema/client/favourites/FavouriteMovieSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";

export const FavouriteMovieAndShowingSchema = z.object({
    movie: z.lazy(() => FavouriteMovieSchema),
    showings: z.array(z.union([IDStringSchema, z.lazy(() => ShowingSchema)])),
});