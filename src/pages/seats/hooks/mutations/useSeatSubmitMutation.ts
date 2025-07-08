import {UseFormReturn} from "react-hook-form";
import SeatRepository from "@/pages/seats/repositories/SeatRepository.ts";
import {SeatForm} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {FormMutationResultParams} from "@/common/type/form/FormMutationResultParams.ts";
import {useMutation, UseMutationResult} from "@tanstack/react-query";
import handleAPIResponse from "@/common/utility/query/handleAPIResponse.ts";
import {SeatSchema} from "@/pages/seats/schema/seat/Seat.schema.ts";
import {toast} from "react-toastify";
import {ParseError} from "@/common/errors/ParseError.ts";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import handleFormSubmitError from "@/common/utility/forms/handleFormSubmitError.ts";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValues.types.ts";

export type SeatSubmitMutationFormParams = FormMutationResultParams & {
    form: UseFormReturn<SeatFormValues>,
}

export default function useSeatSubmitMutation(params: SeatSubmitMutationFormParams): UseMutationResult<Seat, Error, SeatForm> {
    const {
        form,
        _id,
        isEditing,
        successMessage,
        onSubmitSuccess,
        errorMessage,
        onSubmitError,
    } = params;

    const mutationKey = ['submit_seat_data'];

    const submitSeatData = async (values: SeatForm) => {
        const action = isEditing
            ? () => SeatRepository.update({_id, data: values})
            : () => SeatRepository.create({data: values});

        const returnData = await handleAPIResponse({action, errorMessage: "Failed to submit data. Please try again."});
        const {success, data: parsedData, error} = SeatSchema.safeParse(returnData);

        if (!success) {
            toast.error("Invalid data returned. Please try again.");
            throw new ParseError({errors: error?.errors, message: "Invalid Seat Data."});
        }

        return parsedData;
    }

    const onSuccess = (seat: Seat) => {
        toast.success(successMessage || `Seat ${isEditing ? "updated" : "created"} successfully.`);

        onSubmitSuccess && onSubmitSuccess(seat);
    }

    const onError = (error: Error) => {
        toast.error(errorMessage || `Oops. Something went wrong.`);

        handleFormSubmitError({form, error});
        onSubmitError && onSubmitError(error);
    }

    return useMutation({
        mutationKey,
        mutationFn: submitSeatData,
        onSuccess,
        onError,
    });
}