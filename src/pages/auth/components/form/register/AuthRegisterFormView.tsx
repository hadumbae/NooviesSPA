import {FC} from 'react';
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UserRegisterData} from "@/pages/auth/schema/form/AuthForm.types.ts";
import {UseMutationResult} from "@tanstack/react-query";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Form} from "@/common/components/ui/form.tsx";
import useLoggedNavigate from "@/common/hooks/useLoggedNavigate.ts";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for the {@link AuthRegisterFormView} component.
 */
type ViewProps = {
    /** React Hook Form instance managing the registration form state and validation. */
    form: UseFormReturn<UserRegisterData>;

    /** React Query mutation object for handling registration submissions. */
    mutation: UseMutationResult<void, unknown, UserRegisterData>;

    /** Submit handler invoked by React Hook Form when the form is submitted. */
    submitHandler: SubmitHandler<UserRegisterData>;

    /** Optional CSS class name for custom styling of the form. */
    className?: string;
};

/**
 * Presentational component for rendering the user registration form.
 *
 * This component:
 * - Displays input fields for `name`, `email`, `password`, and `confirm` password.
 * - Binds form state and validation to `react-hook-form`.
 * - Integrates with a React Query mutation for submission.
 * - Provides navigation back to the login page.
 *
 * @param props - {@link ViewProps} configuring form, mutation, and handlers.
 * @returns The rendered registration form UI.
 *
 * @example
 * ```tsx
 * <AuthRegisterFormView
 *   form={form}
 *   mutation={mutation}
 *   submitHandler={onSubmit}
 *   className="max-w-md mx-auto"
 * />
 * ```
 */
const AuthRegisterFormView: FC<ViewProps> = (props) => {
    const {form, submitHandler, className, mutation: {isPending, isSuccess}} = props;

    const navigate = useLoggedNavigate();

    /**
     * Navigates the user to the login page.
     */
    const redirectToLogin = () => {
        navigate({
            to: "/auth/login",
            component: AuthRegisterFormView.name,
            message: "Navigate to login from register form.",
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-5", className)}>
                <HookFormInput
                    name="name"
                    label="Name"
                    control={form.control}
                />

                <HookFormInput
                    name="email"
                    label="Email"
                    type="email"
                    control={form.control}
                />

                <HookFormInput
                    name="password"
                    label="Password"
                    type="password"
                    control={form.control}
                />

                <HookFormInput
                    name="confirm"
                    label="Confirm Password"
                    type="password"
                    control={form.control}
                />

                <Button
                    disabled={isPending || isSuccess}
                    variant="default"
                    type="submit"
                    className="w-full bg-primary"
                >
                    Register
                </Button>

                <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    onClick={redirectToLogin}
                >
                    Login
                </Button>
            </form>
        </Form>
    );
};

export default AuthRegisterFormView;
