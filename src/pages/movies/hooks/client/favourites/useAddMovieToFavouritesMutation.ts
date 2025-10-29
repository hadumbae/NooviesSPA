import MovieFavouriteRepository from "@/pages/movies/repositories/MovieFavouriteRepository.ts";
import {MovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {toast} from "react-toastify";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";

interface AddFavouriteParams {
    movieID: ObjectId;
    onSuccess?: (movie: Movie) => void;
    onError?: (error: Error) => void;
}

export default function useAddMovieToFavouritesMutation({movieID, onSuccess, onError}: AddFavouriteParams) {
    const queryClient = useQueryClient();
    const mutationKey = ["add_movie_to_favourite", {movieID}];

    const addToFavourites = async () => {
        const {result} = await MovieFavouriteRepository.addToFavourites({movieID});

        const {data, success, error} = validateData({schema: MovieSchema, data: result});

        if (!success) {
            throw error;
        }

        return data;
    }

    const onMutateSuccess = async (movie: Movie) => {
        await queryClient.invalidateQueries({queryKey: ["fetch_movie_and_related_showings", {movieID}]});

        toast.success("Movie Added To User's Favourites");
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