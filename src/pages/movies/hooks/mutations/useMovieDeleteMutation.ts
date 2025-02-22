import {useMutation} from "@tanstack/react-query";
import {ParseError} from "@/common/errors/ParseError.ts";
import {toast} from "react-toastify";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import MovieRepository from "@/pages/movies/repositories/MovieRepository.ts";
import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";

interface Params {
    onDelete: () => void;
}

export default function useMovieDeleteMutation({onDelete}: Params) {
    const mutationKey = ["delete_single_movie"];

    const mutationFn = async ({_id}: {_id: ObjectId}) => {
        const fetchQueryFn = () => MovieRepository.delete({_id});
        await useFetchErrorHandler({fetchQueryFn});
    }

    const onSuccess = () => {
        toast.success("Movie deleted.");
        onDelete();
    };

    const onError = (error: Error | ParseError) => {
        const {message = "Oops. Something went wrong. Please try again."} = error;
        toast.error(message);
    }

    return useMutation({mutationKey, mutationFn, onSuccess, onError});
}