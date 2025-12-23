import {FC} from 'react';
import useAuthLoginForm from "@/pages/auth/hooks/useAuthLoginForm.ts";
import useAuthLoginSubmitMutation from "@/pages/auth/hooks/useAuthLoginSubmitMutation.ts";
import AuthLoginFormView from "@/pages/auth/components/form/login/AuthLoginFormView.tsx";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {User} from "@/pages/users/schemas/user/User.types.ts";
import {AuthLoginForm, AuthLoginFormValues} from "@/pages/auth/schema/form/AuthLoginForm.types.ts";

/**
 * Props for the `AuthLoginFormContainer` component.
 *
 * Extends `FormMutationOnSubmitParams<AuthUserDetails>` except for the `validationSchema`,
 * which is omitted since validation is handled within the form hook.
 */
type FormProps = Omit<MutationOnSubmitParams<User>, "validationSchema"> & {
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
    // ---- FORM ---
    const form = useAuthLoginForm();

    // --- MUTATION ---
    const mutation = useAuthLoginSubmitMutation({
        form,
        ...mutationProps,
    });

    // --- SUBMIT HANDLER ---

    /**
     * Handles login form submission.
     *
     * @param values - The user-provided login credentials.
     */
    const onSubmit = (values: AuthLoginFormValues) => {
        console.log("Logging In...");
        mutation.mutate(values as AuthLoginForm);
    };

    // --- RENDER ---

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
