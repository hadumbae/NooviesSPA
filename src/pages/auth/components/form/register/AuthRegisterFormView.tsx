import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Form} from "@/common/components/ui/form.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {cn} from "@/common/lib/utils.ts";
import {AuthRegisterForm, AuthRegisterFormValues} from "@/pages/auth/schema/form/AuthRegisterForm.types.ts";

/**
 * Props for {@link AuthRegisterFormView}.
 */
type ViewProps = {
    /** React Hook Form instance controlling registration state. */
    form: UseFormReturn<AuthRegisterFormValues>;

    /** React Query mutation handling registration submission. */
    mutation: UseMutationResult<void, unknown, AuthRegisterForm>;

    /** Form submit handler invoked by React Hook Form. */
    submitHandler: SubmitHandler<AuthRegisterFormValues>;

    /** Optional CSS class for the form container. */
    className?: string;
};

/**
 * Registration form presentation component.
 *
 * @remarks
 * - Renders inputs for name, email, password, and confirmation
 * - Disables submission while mutation is pending or completed
 * - Provides navigation back to the login page
 *
 * @param props - Form state, mutation, and handlers
 *
 * @example
 * ```tsx
 * <AuthRegisterFormView
 *   form={form}
 *   mutation={mutation}
 *   submitHandler={onSubmit}
 * />
 * ```
 */
const AuthRegisterFormView = (props: ViewProps) => {
    const {form, submitHandler, className, mutation: {isPending, isSuccess}} = props;

    const navigate = useLoggedNavigate();

    /**
     * Redirects the user to the login page.
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
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-5", className)}
            >
                <HookFormInput name="name" label="Name" control={form.control} />

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
