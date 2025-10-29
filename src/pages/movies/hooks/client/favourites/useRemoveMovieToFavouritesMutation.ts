import MovieFavouriteRepository from "@/pages/movies/repositories/MovieFavouriteRepository.ts";
import {MovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {toast} from "react-toastify";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";

type RemoveFavouriteParams = {
    movieID: ObjectId;
    onSuccess?: (movie: Movie) => void;
    onError?: (error: Error) => void;
}

export default function useRemoveMovieToFavouritesMutation({movieID, onSuccess, onError}: RemoveFavouriteParams) {
    const queryClient = useQueryClient();
    const mutationKey = ["remove_movie_to_favourite", {movieID}];

    const removeFromFavourites = async () => {
        const {result} = await MovieFavouriteRepository.removeFromFavourites({movieID});

        const {data, success, error} = validateData({schema: MovieSchema, data: result});

        if (!success) {
            throw error;
        }

        return data;
    }

    const onMutateSuccess = async (movie: Movie) => {
        await queryClient.invalidateQueries({queryKey: ["fetch_movie_and_related_showings", {movieID}]});

        toast.success("Movie Removed From User's Favourites");
        onSuccess?.(movie);
    }

    const onMutateError = (error: Error) => {
        if (error instanceof HttpResponseError) {
            const {response: {status}} = error;
            toast.error(`[${status}] Something went wrong! Please try again.`);
        }

        onError?.(error);
    }

    return useMutation({
        mutationKey,
        mutationFn: removeFromFavourites,
        onSuccess: onMutateSuccess,
        onError: onMutateError,
    });
}