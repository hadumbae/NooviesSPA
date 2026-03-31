/**
 * @file Presentation component for the authentication login form.
 * @filename AuthLoginFormView.tsx
 */

import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Form} from "@/common/components/ui/form.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {User} from "@/domains/users/schemas/user/User.types.ts";
import {
    AuthLoginForm,
    AuthLoginFormValues,
} from "@/domains/auth/schema/form/AuthLoginForm.types.ts";

/**
 * Properties for the {@link AuthLoginFormView} component.
 */
type ViewProps = {
    /** The React Hook Form instance providing context, validation, and control state. */
    form: UseFormReturn<AuthLoginFormValues>;

    /** The high-level submission logic passed down from the container. */
    submitHandler: SubmitHandler<AuthLoginFormValues>;

    /** Optional CSS classes for the root form element. */
    className?: string;

    /** * The TanStack Query mutation state.
     * Used here primarily to disable interactions during active network requests.
     */
    mutation: UseMutationResult<User, unknown, AuthLoginForm>;
};

/**
 * A stateless "dumb" component that renders the login UI.
 * ---
 * ### Architecture
 * Following the **Container/Presenter** pattern, this component focuses strictly on
 * layout and user interaction. It does not manage its own state or perform API calls directly.
 * ---
 * ### Key Features
 * * **Loading States:** Automatically disables the "Login" button while `isPending` is true.
 * * **Navigation:** Provides a clear path to the registration flow via `redirectToRegister`.
 * * **Form Integration:** Uses `HookFormInput` for consistent error handling and label styling.
 */
const AuthLoginFormView = (props: ViewProps) => {
    const {form, submitHandler, className, mutation: {isPending}} = props;
    const navigate = useLoggedNavigate();

    /**
     * Redirects the user to the registration page.
     * Logged via `useLoggedNavigate` for observability.
     */
    const redirectToRegister = () => {
        navigate({
            to: "/auth/register",
            component: AuthLoginFormView.name,
            message: "User clicked 'Register' from login view.",
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-3", className)}
            >
                {/* Email field with built-in Zod validation feedback */}
                <HookFormInput
                    name="email"
                    label="Email"
                    type="email"
                    control={form.control}
                    labelClassName="uppercase"
                />

                {/* Password field with hidden character input */}
                <HookFormInput
                    name="password"
                    label="Password"
                    type="password"
                    control={form.control}
                    labelClassName="uppercase"
                />

                <Button
                    variant="primary"
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                >
                    {isPending ? "Logging in..." : "Login"}
                </Button>

                <Button
                    variant="ghost"
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