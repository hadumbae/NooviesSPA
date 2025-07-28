import {UseFormReturn} from "react-hook-form";
import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ScreenForm, ScreenFormValues} from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import {FormMutationResultParams} from "@/common/type/form/FormMutationResultParams.ts";
import handleFormSubmitError from "@/common/utility/forms/handleFormSubmitError.ts";
import {toast} from "react-toastify";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import handleQueryResponse from "@/common/handlers/query/handleQueryResponse.ts";
import {ScreenSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import {ParseError} from "@/common/errors/ParseError.ts";

export type ScreenSubmitMutationParams = FormMutationResultParams<Screen> & {
    form: UseFormReturn<ScreenFormValues>,
    onSubmit?: (screen: Screen) => void,
}

export default function useScreenSubmitMutation(
    {_id, form, isEditing, onSubmitSuccess, onSubmitError, successMessage, errorMessage}: ScreenSubmitMutationParams
) {
    const queryClient = useQueryClient();
    const mutationKey = ['submit_screen_data'];

    const submitScreenData = async (values: ScreenForm) => {
        const action = isEditing
            ? () => ScreenRepository.update({_id, data: values})
            : () => ScreenRepository.create({data: values});

        const returnData = await handleQueryResponse({action, errorMessage: "Failed to submit data. Please try again."});
        const {success, data: parsedData, error} = ScreenSchema.safeParse(returnData);

        if (!success) {
            toast.error("Invalid data returned.");
            throw new ParseError({errors: error?.errors, message: "Invalid Screen Data."});
        }

        return parsedData;
    }

    const onSuccess = async (screen: Screen) => {
        await queryClient.invalidateQueries({queryKey: ["fetch_screens_by_query"], exact: false});

        const message = isEditing ? "Screen updated successfully." : "Screen created successfully.";
        toast.success(successMessage || message)

        onSubmitSuccess && onSubmitSuccess(screen);
    }

    const onError = (error: Error) => {
        toast.error(errorMessage || "Something went wrong. Please try again.");

        handleFormSubmitError({form, error});
        onSubmitError && onSubmitError(error);
    }

    return useMutation({
        mutationKey,
        mutationFn: submitScreenData,
        onSuccess,
        onError,
    });
}