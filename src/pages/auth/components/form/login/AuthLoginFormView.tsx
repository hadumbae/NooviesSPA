/**
 * Login form presentation component.
 *
 * Renders authentication inputs and actions using React Hook Form,
 * delegating submission and mutation handling to the parent.
 */
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Form} from "@/common/components/ui/form.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {User} from "@/pages/users/schemas/user/User.types.ts";
import {
    AuthLoginForm,
    AuthLoginFormValues,
} from "@/pages/auth/schema/form/AuthLoginForm.types.ts";

/**
 * Props for {@link AuthLoginFormView}.
 */
type ViewProps = {
    /**
     * React Hook Form instance managing login state.
     */
    form: UseFormReturn<AuthLoginFormValues>;

    /**
     * Submission handler invoked on valid form submit.
     */
    submitHandler: SubmitHandler<AuthLoginFormValues>;

    /**
     * Optional container class name.
     */
    className?: string;

    /**
     * Login submission mutation.
     */
    mutation: UseMutationResult<User, unknown, AuthLoginForm>;
};

/**
 * Stateless login form view.
 *
 * @remarks
 * - Handles rendering only
 * - Submission, validation, and side effects are delegated
 * - Disables submission while the mutation is pending
 */
const AuthLoginFormView = (props: ViewProps) => {
    const {form, submitHandler, className, mutation: {isPending}} = props;
    const navigate = useLoggedNavigate();

    /**
     * Navigates to the registration page.
     */
    const redirectToRegister = () => {
        navigate({
            to: "/auth/register",
            component: AuthLoginFormView.name,
            message: "Go to `Register` page.",
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-3", className)}
            >
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

                <Button
                    variant="primary"
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                >
                    Login
                </Button>

                <Button
                    variant="secondary"
                    type="button"
                    className="w-full"
                    onClick={redirectToRegister}
                >
                    Register
                </Button>
            </form>
        </Form>
    );
};

export default AuthLoginFormView;
