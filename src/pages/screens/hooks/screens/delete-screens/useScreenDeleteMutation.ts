import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import ScreenRepository from "@/pages/screens/repositories/ScreenRepository.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import handleQueryResponse from "@/common/handlers/query/handleQueryResponse.ts";

type MutationParams = Omit<FormMutationOnSubmitParams, "onSubmitSuccess"> & {
    onSubmitSuccess?: () => void;
}

export default function useScreenDeleteMutation(params: MutationParams = {}) {
    const {onSubmitSuccess, onSubmitError, successMessage, errorMessage} = params;

    const mutationKey = ["delete_single_screen"];
    const queryClient = useQueryClient();

    const mutationFn = async ({_id}: { _id: ObjectId }) => {
        await handleQueryResponse({
            action: () => ScreenRepository.delete({_id}),
            errorMessage: "Failed to delete screen data. Please try again.",
        });
    }

    const onSuccess = async () => {
        toast.success(successMessage ?? "Screen deleted.");
        await queryClient.invalidateQueries({queryKey: ["fetch_screens_by_query"], exact: false});
        onSubmitSuccess && onSubmitSuccess();
    };

    const onError = (error: Error) => {
        toast.error(errorMessage ?? error.message ?? "Something went wrong. Please try again.");
        onSubmitError && onSubmitError(error);
    }

    return useMutation({mutationKey, mutationFn, onSuccess, onError});
}