import {FC} from 'react';
import useAuthLoginForm from "@/pages/auth/hooks/useAuthLoginForm.ts";
import useAuthLoginSubmitMutation from "@/pages/auth/hooks/useAuthLoginSubmitMutation.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import {AuthUserDetails} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";
import AuthLoginFormView from "@/pages/auth/components/form/login/AuthLoginFormView.tsx";
import {UserLoginData} from "@/pages/auth/schema/form/AuthForm.types.ts";

/**
 * Props for the `AuthLoginFormContainer` component.
 *
 * Extends `FormMutationOnSubmitParams<AuthUserDetails>` except for the `validationSchema`,
 * which is omitted since validation is handled within the form hook.
 */
type FormProps = Omit<FormMutationOnSubmitParams<AuthUserDetails>, "validationSchema"> & {
    /** Optional custom CSS class name for styling the container. */
    className?: string;
}

/**
 * A container component that wires up the authentication login form with
 * its validation, mutation, and UI view.
 *
 * This component:
 * - Initializes the form instance with `useAuthLoginForm`.
 * - Creates a login mutation handler with `useAuthLoginSubmitMutation`.
 * - Handles form submission and invokes the mutation.
 *
 * @param className - Optional CSS class for styling.
 * @param mutationProps - Mutation options excluding validation schema.
 *
 * @returns The `AuthLoginFormView` presentation component with form, mutation, and submit handler.
 */
const AuthLoginFormContainer: FC<FormProps> = ({className, ...mutationProps}) => {
    const form = useAuthLoginForm();
    const mutation = useAuthLoginSubmitMutation({form, ...mutationProps});

    /**
     * Handles login form submission.
     *
     * @param values - The user-provided login credentials.
     */
    const onSubmit = (values: UserLoginData) => {
        console.log("Logging In...");
        mutation.mutate(values);
    };

    return (
        <AuthLoginFormView
            form={form}
            submitHandler={onSubmit}
            mutation={mutation}
            className={className}
        />
    );
};

export default AuthLoginFormContainer;
