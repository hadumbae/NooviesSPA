import MovieFavouriteRepository from "@/pages/movies/repositories/MovieFavouriteRepository.ts";
import {Movie, MovieSchema} from "@/pages/movies/schema/model/MovieSchema.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {toast} from "react-toastify";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import parseData from "@/common/utility/validation/parseData.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

interface AddFavouriteParams {
    movieID: ObjectId;
    onSuccess?: (movie: Movie) => void;
    onError?: (error: Error) => void;
}

export default function useAddMovieToFavouritesMutation({movieID, onSuccess, onError}: AddFavouriteParams) {
    const queryClient = useQueryClient();
    const mutationKey = ["add_movie_to_favourite", {movieID}];

    const addToFavourites = async () => {
        const {response, result} = await MovieFavouriteRepository.addToFavourites({movieID});
        if (response.status === 200) return parseData({schema: MovieSchema, data: result});
        throw new HttpResponseError({response, message: "Oops. Something went wrong!"});
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