import {SeatsByRowForm} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import handleAPIResponse from "@/common/utility/query/handleAPIResponse.ts";
import SeatSubmitRepository from "@/pages/seats/repositories/seat-submit-repository/SeatSubmitRepository.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import {toast} from "react-toastify";
import {UseFormReturn} from "react-hook-form";
import {SeatsByRowFormValues} from "@/pages/seats/schema/form/SeatFormValues.types.ts";
import handleFormSubmitError from "@/common/utility/forms/handleFormSubmitError.ts";
import validateAPIResponse from "@/common/utility/query/validateAPIResponse.ts";

type SubmitMutationParams = FormMutationOnSubmitParams<unknown> & {
    form: UseFormReturn<SeatsByRowFormValues>;
}

export default function useSeatsByRowSubmitMutation(
    {form, successMessage, onSubmitSuccess, errorMessage, onSubmitError, validationSchema}: SubmitMutationParams
): UseMutationResult<unknown, Error, SeatsByRowForm> {
    const submitData = async (data: SeatsByRowForm) => {
        const action = () => SeatSubmitRepository.submitSeatsByRow({data});

        const result = await handleAPIResponse({action, errorMessage: "Failed to submit seat data. Please try again."});
        const {data: parsedData, success, error} = validateAPIResponse({
            data: result,
            schema: validationSchema,
            errorMessage: "Invalid data received. Please try again.",
        });

        if (!success) throw error;
        return parsedData;
    }

    const onSuccess = (data: unknown) => {
        toast.success(successMessage ?? "Seats created successfully.");
        onSubmitSuccess && onSubmitSuccess(data);
    }

    const onError = (error: Error) => {
        toast.error(errorMessage ?? error.message ?? "Oops. Something went wrong. Please try again.");
        handleFormSubmitError({error, form});
        onSubmitError && onSubmitError(error);
    }

    return useMutation({
        mutationKey: ["submit_seats_by_row"],
        mutationFn: submitData,
        onSuccess,
        onError
    });
}