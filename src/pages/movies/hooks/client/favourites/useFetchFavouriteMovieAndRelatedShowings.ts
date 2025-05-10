import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import MovieFavouriteRepository from "@/pages/movies/repositories/MovieFavouriteRepository.ts";
import {FavouriteMovieAndShowingSchema} from "@/pages/movies/schema/client/favourites/FavouriteMovieAndShowingSchema.ts";
import useFetchValidatedDataWithRedirect from "@/common/hooks/validation/useFetchValidatedDataWithRedirect.ts";
import {Movie} from "@/pages/movies/schema/MovieSchema.ts";
import {Showing} from "@/pages/showings/schema/base/ShowingSchema.ts";

export default function useFetchFavouriteMovieAndRelatedShowings({movieID}: {movieID: ObjectId}) {
    const queryKey = ["fetch_movie_and_related_showings", {movieID}];
    const action = () => MovieFavouriteRepository.fetchFavouriteMovieAndShowings({movieID});
    const schema = FavouriteMovieAndShowingSchema;

    return useFetchValidatedDataWithRedirect<
        typeof FavouriteMovieAndShowingSchema,
        {movie: Movie, showings: Showing[]}
    >({queryKey, action, schema});
}