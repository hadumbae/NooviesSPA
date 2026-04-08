import {useMutation} from "@tanstack/react-query";
import {UserPasswordUpdateSubmit} from "@/domains/users/schemas/UserPasswordUpdateSubmitSchema.ts";
import UserRepository from "@/domains/users/repositories/UserRepository.ts";
import {toast} from "react-toastify";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

interface IParams {
    userID: ObjectId;
    onSubmit?: () => void;
}

export default function useUpdateUserPasswordSubmitMutation({userID, onSubmit}: IParams) {
    const submitPasswordUpdate = async (data: UserPasswordUpdateSubmit) => {
        const {result} = await UserRepository.updatePassword({userID, data});
        return result;
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