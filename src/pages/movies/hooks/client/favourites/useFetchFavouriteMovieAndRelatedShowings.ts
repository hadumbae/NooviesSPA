// import MovieFavouriteRepository from "@/pages/movies/repositories/MovieFavouriteRepository.ts";
// import {FavouriteMovieAndShowingSchema} from "@/pages/movies/schema/client/favourites/FavouriteMovieAndShowingSchema.ts";
// import {FavouriteMovie} from "@/pages/movies/schema/client/favourites/FavouriteMovieSchema.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useQuery} from "@tanstack/react-query";

export default function useFetchFavouriteMovieAndRelatedShowings({movieID}: {movieID: ObjectId}) {
    const queryKey = ["fetch_movie_and_related_showings", {movieID}];
    // const action = () => MovieFavouriteRepository.fetchFavouriteMovieAndShowings({movieID});
    // const schema = FavouriteMovieAndShowingSchema;

    return useQuery({
        queryKey,
    });
}