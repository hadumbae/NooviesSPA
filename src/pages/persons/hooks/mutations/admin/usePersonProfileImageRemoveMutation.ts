import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {PersonImageRepository} from "@/pages/persons/repositories/PersonImageRepository.ts";
import handleQueryResponse from "@/common/handlers/query/handleQueryResponse.ts";
import {toast} from "react-toastify";
import {RequestOptions} from "@/common/type/request/RequestOptions.ts";

type ImageSubmitParams = RequestOptions & {
    _id: ObjectId,
    onSubmitSuccess?: (data: unknown) => void;
    successToast?: string;
    onSubmitFailure?: (error: Error) => void;
    failureToast?: string;
};

export default function usePersonProfileImageRemoveMutation(params: ImageSubmitParams) {
    const {_id, onSubmitSuccess, successToast, onSubmitFailure, failureToast, ...options} = params;
    const queryClient = useQueryClient();

    const mutationKey = ["remove_person_profile_image", {_id}] as const;

    const removeImage = async () => {
        return handleQueryResponse({
            action: () => PersonImageRepository.removeProfileImage({personID: _id, ...options})
        });
    }

    const onSuccess = async (data: unknown) => {
        toast.success(successToast || "Image removed successfully.");
        await queryClient.invalidateQueries({queryKey: ["fetch_single_person"], exact: false})

        onSubmitSuccess && onSubmitSuccess(data);
    }

    const onError = (error: Error) => {
        toast.success(failureToast || "Image removal failed. Please try again.");
        onSubmitFailure && onSubmitFailure(error);
    }

    return useMutation({
        mutationKey,
        mutationFn: removeImage,
        onSuccess,
        onError,
    });
}