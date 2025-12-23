import useAuthRegisterForm from "@/pages/auth/hooks/useAuthRegisterForm.ts";
import useAuthRegisterSubmitMutation from "@/pages/auth/hooks/useAuthRegisterSubmitMutation.ts";
import AuthRegisterFormView from "@/pages/auth/components/form/register/AuthRegisterFormView.tsx";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {AuthRegisterForm, AuthRegisterFormValues} from "@/pages/auth/schema/form/AuthRegisterForm.types.ts";

/**
 * Props for {@link AuthRegisterFormContainer}.
 */
type ContainerProps =
    Omit<MutationOnSubmitParams, "onSubmitSuccess" | "validationSchema"> & {
    /** Optional callback fired after successful registration. */
    onSubmitSuccess?: () => void;

    /** Optional CSS class for styling the form container. */
    className?: string;
};

/**
 * Registration form container component.
 *
 * @remarks
 * - Initializes the registration form with validation
 * - Wires React Query mutation for submission
 * - Delegates rendering to {@link AuthRegisterFormView}
 *
 * @param props - Mutation configuration and optional UI styling
 *
 * @example
 * ```tsx
 * <AuthRegisterFormContainer
 *   onSubmitSuccess={() => navigate("/login")}
 * />
 * ```
 */
const AuthRegisterFormContainer = ({className, ...mutationProps}: ContainerProps) => {
    const form = useAuthRegisterForm();

    const mutation = useAuthRegisterSubmitMutation({
        form,
        ...mutationProps,
    });

    /**
     * Handles registration form submission.
     */
    const onSubmit = (values: AuthRegisterFormValues) => {
        mutation.mutate(values as AuthRegisterForm);
    };

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
