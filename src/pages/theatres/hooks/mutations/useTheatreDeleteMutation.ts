import {useMutation} from "@tanstack/react-query";
import {FetchError} from "@/common/errors/FetchError.ts";
import {toast} from "react-toastify";
import useFetchErrorHandler from "@/common/handlers/query/FetchErrorHandler.ts";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";

interface Params {
    onDelete: () => void;
}

export default function useTheatreDeleteMutation({onDelete}: Params) {
    const mutationKey = ["delete_single_theatre"];

    const mutationFn = async ({_id}: {_id: ObjectId}) => {
        const fetchQueryFn = () => TheatreRepository.delete({_id});
        await useFetchErrorHandler({fetchQueryFn});
    }

    const onSuccess = () => {
        toast.success("Theatre deleted.");
        onDelete();
    };

    const onError = (error: Error | FetchError) => {
        const {message = "Oops. Something went wrong. Please try again."} = error;
        toast.error(message);
    }

    return useMutation({mutationKey, mutationFn, onSuccess, onError});
}