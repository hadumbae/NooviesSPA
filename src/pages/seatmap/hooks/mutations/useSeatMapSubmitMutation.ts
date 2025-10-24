import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {SeatMapSubmit} from "@/pages/seatmap/schema/SeatMapSubmitSchema.ts";
import {SeatMap, SeatMapSchema} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import SeatMapRepository from "@/pages/seatmap/repositories/SeatMapRepository.ts";
import {toast} from "react-toastify";
import {UseFormReturn} from "react-hook-form";
import validateData from "@/common/hooks/validation/validate-data/validateData.ts";
import {MutationEditByIDParams, MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import handleMutationFormError from "@/common/utility/handlers/handleMutationFormError.ts";

type FormSubmitParams = MutationOnSubmitParams<SeatMap> & MutationEditByIDParams & {
    form: UseFormReturn<SeatMapSubmit>;
}

export default function useSeatMapSubmitMutation(params: FormSubmitParams): UseMutationResult<SeatMap, unknown, SeatMapSubmit> {
    const {form, isEditing, _id, onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;

    const mutationKey = ['submit_single_seat_map'];

    const mutationFn = async (values: SeatMapSubmit) => {
        const action = isEditing
            ? () => SeatMapRepository.update({_id, data: values})
            : () => SeatMapRepository.create({data: values});

        const {result} = await action();

        const {data, success, error} = validateData({
            data: result,
            schema: SeatMapSchema,
            message: "Failed to submit seat map data.",
        });

        if (!success) {
            throw error;
        }

        return data;
    };

    const onSuccess = (seatMap: SeatMap) => {
        toast.success(successMessage ?? "Success! Seat Map submitted.");
        onSubmitSuccess?.(seatMap);
    };

    const onError = (error: unknown) => {
        const displayMessage = errorMessage ?? "Failed to submit seat map data. Please try again.";
        handleMutationFormError({error, form, displayMessage});
        onSubmitError?.(error);
    }

    return useMutation({
        mutationKey,
        mutationFn,
        onSuccess,
        onError,
    });
}