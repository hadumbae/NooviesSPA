import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ParseError} from "@/common/errors/ParseError.ts";
import {toast} from "react-toastify";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

interface Params {
    onDelete?: () => void;
}

export default function useScreenDeleteMutation({onDelete}: Params = {}) {
    const mutationKey = ["delete_single_screen"];
    const queryClient = useQueryClient();

    const mutationFn = async ({_id}: {_id: ObjectId}) => {
        const fetchQueryFn = () => ScreenRepository.delete({_id});
        await useFetchErrorHandler({fetchQueryFn});
    }

    const onSuccess = async () => {
        toast.success("Screen deleted.");
        await queryClient.invalidateQueries({queryKey: ["fetch_screens_by_query"], exact: false});

        onDelete && onDelete();
    };

    const onError = (error: Error | ParseError) => {
        const {message = "Oops. Something went wrong. Please try again."} = error;
        toast.error(message);
    }

    return useMutation({mutationKey, mutationFn, onSuccess, onError});
}