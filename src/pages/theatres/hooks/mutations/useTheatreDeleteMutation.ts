import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ParseError} from "@/common/errors/ParseError.ts";
import {toast} from "react-toastify";
import TheatreRepository from "@/pages/theatres/repositories/TheatreRepository.ts";

import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import handleAPIResponse from "@/common/utility/query/handleAPIResponse.ts";

export default function useTheatreDeleteMutation(options: FormMutationOnSubmitParams) {
    const {successMessage, onSubmitSuccess, errorMessage, onSubmitError} = options;

    const mutationKey = ["delete_single_theatre"];
    const queryClient = useQueryClient();

    const mutationFn = async ({_id}: { _id: ObjectId }) => {
        await handleAPIResponse({
            action: () => TheatreRepository.delete({_id}),
            errorMessage: "Failed to delete theatre data. Please try again.",
        });
    }

    const onSuccess = async () => {
        toast.success(successMessage ?? "Theatre deleted.");
        await queryClient.invalidateQueries({queryKey: ["fetch_theatres_by_query"], exact: false});
        onSubmitSuccess && onSubmitSuccess();
    };

    const onError = (error: Error | ParseError) => {
        const {message = "Oops. Something went wrong. Please try again."} = error;
        toast.error(errorMessage ?? message);
        onSubmitError && onSubmitError(error);
    }

    return useMutation({mutationKey, mutationFn, onSuccess, onError});
}