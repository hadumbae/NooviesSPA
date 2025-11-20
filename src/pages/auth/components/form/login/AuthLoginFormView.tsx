import {FC} from 'react';
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Form} from "@/common/components/ui/form.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {AuthUserDetails} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";
import {UserLoginData} from "@/pages/auth/schema/form/AuthForm.types.ts";
import {PrimaryButtonCSS, SecondaryButtonCSS} from "@/common/constants/css/ButtonCSS.ts";

/**
 * Props for the `AuthLoginFormView` component.
 */
type ViewProps = {
    /** React Hook Form instance for managing form state and validation. */
    form: UseFormReturn<UserLoginData>;

    /** Function to handle form submission. */
    submitHandler: SubmitHandler<UserLoginData>;

    /** Optional CSS class for styling the form container. */
    className?: string;

    /** React Query mutation result for submitting login data. */
    mutation: UseMutationResult<AuthUserDetails, unknown, UserLoginData>;
}

/**
 * Presentation component for the login form.
 *
 * Renders the email and password fields, login and register buttons,
 * and manages form submission state.
 *
 * @param props - Props including form instance, submit handler, mutation, and optional className.
 */
const AuthLoginFormView: FC<ViewProps> = (props) => {
    const {form, submitHandler, className, mutation: {isPending}} = props;
    const navigate = useLoggedNavigate();

    /**
     * Redirects the user to the registration page.
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
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-5", className)}>
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
                    variant="default"
                    type="submit"
                    className={cn(PrimaryButtonCSS, "w-full")}
                    disabled={isPending}
                >
                    Login
                </Button>

                <Button
                    variant="outline"
                    className={cn(SecondaryButtonCSS, "w-full")}
                    type="button"
                    onClick={redirectToRegister}
                >
                    Register
                </Button>
            </form>
        </Form>
    );
};

export default AuthLoginFormView;
