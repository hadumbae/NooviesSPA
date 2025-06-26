import {UseFormReturn} from "react-hook-form";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";
import {TheatreSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import {Theatre} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {TheatreForm, TheatreFormValues} from "@/pages/theatres/schema/forms/TheatreForm.types.ts";
import {FormMutationResultParams} from "@/common/type/form/FormMutationResultParams.ts";
import handleAPIResponse from "@/common/utility/query/handleAPIResponse.ts";
import {toast} from "react-toastify";
import {ParseError} from "@/common/errors/ParseError.ts";
import handleFormSubmitError from "@/common/utility/forms/handleFormSubmitError.ts";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";

export type TheatreSubmitMutationParams = FormMutationResultParams & {
    form: UseFormReturn<TheatreFormValues>;
}

export default function useTheatreSubmitMutation(
    params: TheatreSubmitMutationParams
): UseMutationResult<Theatre, Error, TheatreForm> {
    const {
        successMessage,
        onSubmitSuccess,
        errorMessage,
        onSubmitError,
        isEditing,
        _id,
        form,
    } = params;

    const mutationKey = ['submit_theatre_data'];
    const queryClient = useQueryClient();

    const submitTheatreData = async (values: TheatreForm) => {
        const action = isEditing
            ? () => TheatreRepository.update({_id, data: values})
            : () => TheatreRepository.create({data: values});

        const returnData = await handleAPIResponse({action, errorMessage: "Failed to submit data. Please try again."});
        const {success, data: parsedData, error} = TheatreSchema.safeParse(returnData);

        if (!success) {
            toast.error("Invalid data returned. Please try again.");
            throw new ParseError({errors: error?.errors, message: "Invalid Theatre Data."});
        }

        return parsedData;
    }

    const onSuccess = async (theatre: Theatre) => {
        const message = isEditing ? "Theatre updated." : "Theatre created.";
        toast.success(successMessage || message);

        await queryClient.invalidateQueries({queryKey: ["fetch_theatres_by_query"], exact: false});

        onSubmitSuccess && onSubmitSuccess(theatre);
    }

    const onError = (error: Error) => {
        toast.error(errorMessage || "Oops. Something went wrong.");
        handleFormSubmitError({form, error});

        onSubmitError && onSubmitError(error);
    }

    return useMutation({
        mutationKey,
        mutationFn: submitTheatreData,
        onSuccess,
        onError,
    });
}