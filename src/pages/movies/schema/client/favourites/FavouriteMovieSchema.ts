import {MovieSchema} from "@/pages/movies/schema/MovieSchema.ts";
import {z} from "zod";

export const FavouriteMovieSchema = MovieSchema.extend({
    isFavourite: z.boolean(),
});

export type FavouriteMovie = z.infer<typeof FavouriteMovieSchema>;