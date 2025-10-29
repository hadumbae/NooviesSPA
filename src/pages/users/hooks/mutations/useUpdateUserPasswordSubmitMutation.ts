import {useMutation} from "@tanstack/react-query";
import {UserPasswordUpdateSubmit} from "@/pages/users/schemas/UserPasswordUpdateSubmitSchema.ts";
import UserRepository from "@/pages/users/repositories/UserRepository.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {toast} from "react-toastify";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

interface IParams {
    userID: ObjectId;
    onSubmit?: () => void;
}

export default function useUpdateUserPasswordSubmitMutation({userID, onSubmit}: IParams) {
    const submitPasswordUpdate = async (data: UserPasswordUpdateSubmit) => {
        const {response} = await UserRepository.updatePassword({userID, data});

        if (response.status === 200) return;

        const messages: Record<number, string> = {
            401: "Oops. Unauthorized.",
            403: "Oops. Unauthorized.",
            404: "Oops. Failed To Find User. Please try again later.",
        }

        const message = messages[response.status] ?? "Oops. Failed To Update Your Password. Please try again later.";
        throw new HttpResponseError({response, message});
    }

    const onSuccess = () => {
        toast.success("Your password has been updated successfully!");
        onSubmit && onSubmit();
    }

    const onError = (error: Error) => {
        toast.error(error.message || "Oops. Something went wrong! Please try again later!");
    }

    return useMutation({
        mutationKey: ['submit_auth_user_password_update'],
        mutationFn: submitPasswordUpdate,
        onSuccess,
        onError,
    });
}