import {FC} from 'react';
import useUpdateUserPasswordForm from "@/pages/users/hooks/form/useUpdateUserPasswordForm.ts";
import useUpdateUserPasswordSubmitMutation from "@/pages/users/hooks/mutations/useUpdateUserPasswordSubmitMutation.ts";
import {UserPasswordUpdateSubmit} from "@/pages/users/schemas/UserPasswordUpdateSubmitSchema.ts";
import UpdateUserPasswordFormView from "@/pages/client/user/components/forms/UpdateUserPasswordFormView.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

interface UpdateUserPasswordFormContainerProps {
    userID: ObjectId;
    onSubmit?: () => void;
    className?: string;
}

const UpdateUserPasswordFormContainer: FC<UpdateUserPasswordFormContainerProps> = ({userID, onSubmit, className}) => {
    const form = useUpdateUserPasswordForm();

    const onFormSubmit = () => {
        onSubmit && onSubmit();
        form.reset();
    }

    const mutation = useUpdateUserPasswordSubmitMutation({
        userID,
        onSubmit: onFormSubmit
    });

    const submitHandler = (values: UserPasswordUpdateSubmit) => {
        console.log("[UpdateUserPasswordForm] Values: ", values);
        mutation.mutate(values);
    }

    return (
        <UpdateUserPasswordFormView
            form={form}
            mutation={mutation}
            submitHandler={submitHandler}
            className={className}
        />
    );
};

export default UpdateUserPasswordFormContainer;
