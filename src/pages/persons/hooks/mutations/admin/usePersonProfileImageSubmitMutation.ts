import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {PersonImageRepository} from "@/pages/persons/repositories/PersonImageRepository.ts";
import {RequestOptions} from "@/common/type/repositories/EntityRequestParamTypes.ts";
import {PersonProfileImageSubmitObject} from "@/pages/persons/schema/admin/PersonProfileImageSubmitSchema.ts";
import handleQueryResponse from "@/common/handlers/query/handleQueryResponse.ts";
import {toast} from "react-toastify";

type ImageSubmitParams = RequestOptions & {
    _id: ObjectId,
    onSubmitSuccess?: (data: unknown) => void;
    successToast?: string;
    onSubmitFailure?: (error: Error) => void;
    failureToast?: string;
};

export default function usePersonProfileImageSubmitMutation(params: ImageSubmitParams) {
    const {_id, onSubmitSuccess, successToast, onSubmitFailure, failureToast, ...options} = params;
    const queryClient = useQueryClient();

    const mutationKey = ["submit_person_profile_image", {_id}] as const;

    const uploadImage = async (data: PersonProfileImageSubmitObject) => {
        const formData = new FormData();
        formData.append("profileImage", data.profileImage);

        return handleQueryResponse({
            action: () => PersonImageRepository.uploadProfileImage({personID: _id, data: formData, ...options})
        });
    }

    const onSuccess = async (data: unknown) => {
        toast.success(successToast || "Image upload successfully.");
        await queryClient.invalidateQueries({queryKey: ["fetch_single_person"], exact: false})

        onSubmitSuccess && onSubmitSuccess(data);
    }

    const onError = (error: Error) => {
        toast.success(failureToast || "Image upload failed. Please try again.");
        onSubmitFailure && onSubmitFailure(error);
    }

    return useMutation({
        mutationKey,
        mutationFn: uploadImage,
        onSuccess,
        onError,
    });
}