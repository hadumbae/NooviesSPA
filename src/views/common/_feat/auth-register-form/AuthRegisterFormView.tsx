/**
 * @fileoverview Registration form view component for user account creation.
 */

import {HookFormInput} from "@/views/common/_feat";
import {Button} from "@/common/components/ui/button.tsx";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {ReactElement} from "react";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {useFormContext} from "react-hook-form";

/** Props for the AuthRegisterFormView component. */
type ViewProps = {
    className?: string;
};

/**
 * Presentation component for the user registration form.
 */
export function AuthRegisterFormView(
    {className}: ViewProps
): ReactElement {
    const navigate = useLoggedNavigate();

    const {formID, isPending} = useBaseFormContext();
    const {control} = useFormContext();

    const redirectToLogin = () => {
        navigate({
            to: "/auth/login",
            component: AuthRegisterFormView.name,
            message: "Navigate to login from register form.",
        });
    };

    return (
        <div className="space-y-5">
            <fieldset className={cn("space-y-3", className)}>
                <HookFormInput name="name" label="Name" control={control}/>
                <HookFormInput name="email" label="Email" type="email" control={control}/>
                <HookFormInput name="password" label="Password" type="password" control={control}/>
                <HookFormInput name="confirm" label="Confirm Password" type="password" control={control}/>
            </fieldset>

            <div className="space-y-1">
                <Button
                    variant="primary"
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                    form={formID}
                >
                    Register
                </Button>

                <Button
                    variant="ghost"
                    type="button"
                    className="w-full secondary-text"
                    onClick={redirectToLogin}
                >
                    Login
                </Button>
            </div>
        </div>
    );
}
