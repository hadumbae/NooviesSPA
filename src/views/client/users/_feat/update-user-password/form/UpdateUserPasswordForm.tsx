import {ReactElement} from 'react';
import {
    useUpdateUserPasswordForm
} from "@/domains/users/_feat/update-password/hooks/useUpdateUserPasswordForm.ts";
import {
    useUpdateUserPasswordSubmitMutation
} from "@/domains/users/_feat/update-password/hooks/useUpdateUserPasswordSubmitMutation.ts";
import {UserPasswordUpdateFormData} from "@/domains/users/_feat/update-password/schema/UserPasswordUpdateFormSchema.ts";
import {UpdateUserPasswordFormView} from "@/views/client/users/_feat/update-user-password/form/UpdateUserPasswordFormView.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

type FormProps = {
    userID: ObjectId;
    onSubmit?: () => void;
    className?: string;
}

export function UpdateUserPasswordForm(
    {userID, onSubmit, className}: FormProps
): ReactElement {
    const form = useUpdateUserPasswordForm();

    const onFormSubmit = () => {
        onSubmit && onSubmit();
        form.reset();
    }

    const mutation = useUpdateUserPasswordSubmitMutation({
        userID,
        onSubmit: onFormSubmit
    });

    const submitHandler = (values: UserPasswordUpdateFormData) => {
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
}


