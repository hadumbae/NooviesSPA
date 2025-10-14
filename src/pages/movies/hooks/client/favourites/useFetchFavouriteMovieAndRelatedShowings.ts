import MovieFavouriteRepository from "@/pages/movies/repositories/MovieFavouriteRepository.ts";
import {FavouriteMovieAndShowingSchema} from "@/pages/movies/schema/client/favourites/FavouriteMovieAndShowingSchema.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {FavouriteMovie} from "@/pages/movies/schema/client/favourites/FavouriteMovieSchema.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";

export default function useFetchFavouriteMovieAndRelatedShowings({movieID}: {movieID: ObjectId}) {
    const queryKey = ["fetch_movie_and_related_showings", {movieID}];
    const action = () => MovieFavouriteRepository.fetchFavouriteMovieAndShowings({movieID});
    const schema = FavouriteMovieAndShowingSchema;

    return useFetchValidatedDataWithRedirect<
        typeof FavouriteMovieAndShowingSchema,
        {movie: FavouriteMovie, showings: Showing[]}
    >({queryKey, action, schema});
}