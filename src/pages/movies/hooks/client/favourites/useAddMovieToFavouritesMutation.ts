import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import MovieFavouriteRepository from "@/pages/movies/repositories/MovieFavouriteRepository.ts";
import {Movie, MovieSchema} from "@/pages/movies/schema/MovieSchema.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {toast} from "react-toastify";
import {useMutation} from "@tanstack/react-query";
import parseData from "@/common/utility/validation/parseData.ts";

interface AddFavouriteParams {
    movieID: ObjectId;
    onSuccess?: (movie: Movie) => void;
    onError?: (error: Error) => void;
}

export default function useAddMovieToFavouritesMutation({movieID, onSuccess, onError}: AddFavouriteParams) {
    const mutationKey = ["add_movie_to_favourite", {movieID}];

    const addToFavourites = async ({movieID}: { movieID: ObjectId }) => {
        const {response, result} = await MovieFavouriteRepository.addToFavourites({movieID});
        if (response.status === 200) return parseData({schema: MovieSchema, data: result});
        throw new HttpResponseError({response, message: "Oops. Something went wrong!"});
    }

    const onMutateSuccess = (movie: Movie) => {
        toast.success("Movie Added To User's Favourites.");
        onSuccess && onSuccess(movie);
    }

    const onMutateError = (error: Error) => {
        if (error instanceof HttpResponseError) {
            const {response: {status}} = error;
            toast.error(`[${status}] Something went wrong! Please try again.`);
        }

        onError && onError(error);
    }

    return useMutation({
        mutationKey,
        mutationFn: addToFavourites,
        onSuccess: onMutateSuccess,
        onError: onMutateError,
    });
}