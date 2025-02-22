import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {useMutation} from "@tanstack/react-query";
import {ParseError} from "@/common/errors/ParseError.ts";
import {toast} from "react-toastify";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";

interface Params {
    onDelete: () => void;
}

export default function useSeatDeleteMutation({onDelete}: Params) {
    const mutationKey = ["delete_single_seat"];

    const mutationFn = async ({_id}: {_id: ObjectId}) => {
        const fetchQueryFn = () => SeatRepository.delete({_id});
        await useFetchErrorHandler({fetchQueryFn});
    }

    const onSuccess = () => {
        toast.success("Seat deleted.");
        onDelete();
    };

    const onError = (error: Error | ParseError) => {
        const {message = "Oops. Something went wrong. Please try again."} = error;
        toast.error(message);
    }

    return useMutation({mutationKey, mutationFn, onSuccess, onError});
}