/**
 * @fileoverview Presentation component for the authentication login form.
 */

import {cn} from "@/common/_feat";
import {HookFormInput} from "@/views/common/_feat";
import {Button} from "@/common/components/ui/button.tsx";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";

/** Props for the AuthLoginFormView component. */
type ViewProps = {
    className?: string;
};

/** Stateless component that renders the login user interface. */
export function AuthLoginFormView(
    {className}: ViewProps
): ReactElement {
    const {formID, isPending} = useBaseFormContext();
    const {control} = useFormContext();
    const navigate = useLoggedNavigate();

    const redirectToRegister = () => {
        navigate({
            to: "/auth/register",
            component: AuthLoginFormView.name,
            message: "User clicked 'Register' from login view.",
        });
    };

    return (
        <div className={cn("space-y-5", className)}>
            <HookFormInput
                name="email"
                label="Email"
                type="email"
                control={control}
                classNames={{label: "uppercase"}}
            />

            <HookFormInput
                name="password"
                label="Password"
                type="password"
                control={control}
                classNames={{label: "uppercase"}}
            />

            <div className="space-y-1">
                <Button
                    variant="primary"
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                    form={formID}
                >
                    Login
                </Button>

                <Button
                    variant="ghost"
                    type="button"
                    className="w-full secondary-text"
                    onClick={redirectToRegister}
                >
                    Register
                </Button>
            </div>

        </div>
    );
}