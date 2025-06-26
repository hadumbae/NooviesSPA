import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ParseError} from "@/common/errors/ParseError.ts";
import {toast} from "react-toastify";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";

import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

interface Params {
    onDelete?: () => void;
}

export default function useTheatreDeleteMutation({onDelete}: Params) {
    const mutationKey = ["delete_single_theatre"];
    const queryClient = useQueryClient();

    const mutationFn = async ({_id}: {_id: ObjectId}) => {
        const fetchQueryFn = () => TheatreRepository.delete({_id});
        await useFetchErrorHandler({fetchQueryFn});
    }

    const onSuccess = async () => {
        toast.success("Theatre deleted.");

        await queryClient.invalidateQueries({queryKey: ["fetch_theatres_by_query"], exact: false});

        onDelete && onDelete();
    };

    const onError = (error: Error | ParseError) => {
        const {message = "Oops. Something went wrong. Please try again."} = error;
        toast.error(message);
    }

    return useMutation({mutationKey, mutationFn, onSuccess, onError});
}