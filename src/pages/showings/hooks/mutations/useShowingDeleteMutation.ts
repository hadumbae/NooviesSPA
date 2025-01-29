import {useMutation} from "@tanstack/react-query";
import {FetchError} from "@/common/errors/FetchError.ts";
import {toast} from "react-toastify";
import useFetchErrorHandler from "@/common/handlers/query/FetchErrorHandler.ts";
import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import ShowingRepository from "@/pages/showings/repositories/ShowingRepository.ts";

interface Params {
    onDelete: () => void;
}

export default function useShowingDeleteMutation({onDelete}: Params) {
    const mutationKey = ["delete_single_showing"];

    const mutationFn = async ({_id}: {_id: ObjectId}) => {
        const fetchQueryFn = () => ShowingRepository.delete({_id});
        await useFetchErrorHandler({fetchQueryFn});
    }

    const onSuccess = () => {
        toast.success("Showing deleted.");
        onDelete();
    };

    const onError = (error: Error | FetchError) => {
        const {message = "Oops. Something went wrong. Please try again."} = error;
        toast.error(message);
    }

    return useMutation({mutationKey, mutationFn, onSuccess, onError});
}