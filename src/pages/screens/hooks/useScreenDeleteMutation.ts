import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {useMutation} from "@tanstack/react-query";
import {FetchError} from "@/common/errors/FetchError.ts";
import {toast} from "react-toastify";
import useFetchErrorHandler from "@/common/handlers/query/FetchErrorHandler.ts";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";

interface Params {
    onDelete: () => void;
}

export default function useScreenDeleteMutation({onDelete}: Params) {
    const mutationKey = ["delete_single_screen"];

    const mutationFn = async ({_id}: {_id: ObjectId}) => {
        const fetchQueryFn = () => ScreenRepository.delete({_id});
        await useFetchErrorHandler({fetchQueryFn});
    }

    const onSuccess = () => {
        toast.success("Screen deleted.");
        onDelete();
    };

    const onError = (error: Error | FetchError) => {
        const {message = "Oops. Something went wrong. Please try again."} = error;
        toast.error(message);
    }

    return useMutation({mutationKey, mutationFn, onSuccess, onError});
}