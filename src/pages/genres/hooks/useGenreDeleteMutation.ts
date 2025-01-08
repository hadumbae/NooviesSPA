import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {useMutation} from "@tanstack/react-query";
import useFetchErrorHandler from "@/common/utility/useFetchErrorHandler.ts";
import GenreRepository from "@/pages/genres/repositories/GenreRepository.ts";
import {toast} from "react-toastify";
import {FetchError} from "@/common/type/error/FetchError.ts";

interface IUseDeleteGenreMutationParams {
    onDelete: () => void,
}

export default function useGenreDeleteMutation(params: IUseDeleteGenreMutationParams) {
    const {onDelete} = params;

    const deleteGenre = async ({_id}: {_id: ObjectId}) => {
        const fetchQueryFn = () => GenreRepository.delete({_id});
        await useFetchErrorHandler({fetchQueryFn});
    }

    const onSuccess = () => {
        toast.success("Genre deleted.");
        onDelete();
    }

    const onError = (error: Error | FetchError) => {
        const {message = "Oops. Something went wrong. Please try again."} = error;
        toast.error(message);
    }

    return useMutation({
        mutationKey: ['delete_single_genre'],
        mutationFn: deleteGenre,
        onSuccess,
        onError,
    });
}