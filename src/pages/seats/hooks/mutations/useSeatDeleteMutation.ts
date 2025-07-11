import  {useMutation, useQueryClient} from "@tanstack/react-query";
import {ParseError} from "@/common/errors/ParseError.ts";
import {toast} from "react-toastify";
import useFetchErrorHandler from "@/common/handlers/query/handleFetchError.ts";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";

export default function useSeatDeleteMutation(params: FormMutationOnSubmitParams = {}) {
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;

    const queryClient = useQueryClient();
    const mutationKey = ["delete_single_seat"];

    const mutationFn = async ({_id}: {_id: ObjectId}) => {
        const fetchQueryFn = () => SeatRepository.delete({_id});
        await useFetchErrorHandler({fetchQueryFn});
    }

    const onSuccess = async () => {
        toast.success(successMessage ?? "Seat deleted.");

        await Promise.all([
            queryClient.invalidateQueries({queryKey: ["fetch_seats_by_query"], exact: false}),
            queryClient.invalidateQueries({queryKey: ["fetch_screen_seats_by_row"], exact: false}),
        ]);

        onSubmitSuccess && onSubmitSuccess();
    };

    const onError = (error: Error | ParseError) => {
        const {message} = error;
        toast.error(errorMessage ?? message ?? "Oops. Something went wrong. Please try again.");
        onSubmitError && onSubmitError(error);
    }

    return useMutation({mutationKey, mutationFn, onSuccess, onError});
}