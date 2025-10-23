import {FC} from 'react';
import useAuthRegisterForm from "@/pages/auth/hooks/useAuthRegisterForm.ts";
import useAuthRegisterSubmitMutation from "@/pages/auth/hooks/useAuthRegisterSubmitMutation.ts";
import {UserRegisterData} from "@/pages/auth/schema/form/AuthForm.types.ts";
import AuthRegisterFormView from "@/pages/auth/components/form/register/AuthRegisterFormView.tsx";

import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Props for the {@link AuthRegisterFormContainer} component.
 *
 * Extends {@link MutationOnSubmitParams} (excluding `onSubmitSuccess` and `validationSchema`)
 * with optional UI configuration.
 */
type ContainerProps = Omit<MutationOnSubmitParams, "onSubmitSuccess" | "validationSchema"> & {
    /** Optional callback invoked when the registration succeeds. */
    onSubmitSuccess?: () => void;

    /** Optional custom CSS class for styling the container. */
    className?: string;
};

/**
 * Container component for the user registration form.
 *
 * - Initializes a `react-hook-form` instance with validation.
 * - Configures the registration mutation using React Query.
 * - Passes the form, mutation state, and submit handler down to {@link AuthRegisterFormView}.
 *
 * @param props - Props controlling form mutation behavior and optional UI styling.
 * @returns A fully wired registration form ready for rendering.
 *
 * @example
 * ```tsx
 * <AuthRegisterFormContainer
 *   onSubmitSuccess={() => navigate("/login")}
 *   successMessage="Registration successful! Welcome aboard."
 *   errorMessage="Could not register. Please try again later."
 * />
 * ```
 */
const AuthRegisterFormContainer: FC<ContainerProps> = ({className, ...mutationProps}) => {
    const form = useAuthRegisterForm();
    const mutation = useAuthRegisterSubmitMutation({form, ...mutationProps});

    /**
     * Handles submission of the registration form.
     *
     * @param values - User-provided registration data.
     */
    const onSubmit = (values: UserRegisterData) => mutation.mutate(values);

    return (
        <AuthRegisterFormView
            form={form}
            mutation={mutation}
            submitHandler={onSubmit}
            className={className}
        />
    );
};

export default AuthRegisterFormContainer;
