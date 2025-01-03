import {FC} from 'react';
import useAuthLoginForm from "@/pages/auth/hooks/useAuthLoginForm.ts";
import useAuthLoginSubmitMutation from "@/pages/auth/hooks/useAuthLoginSubmitMutation.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {UserLoginData} from "@/pages/auth/schema/AuthLoginSchema.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {cn} from "@/common/lib/utils.ts";

interface Props {
    className?: string;
}

const AuthLoginForm: FC<Props> = ({className}) => {
    const navigate = useNavigate();
    const form = useAuthLoginForm();
    const {mutate, isPending} = useAuthLoginSubmitMutation({form});

    const onSubmit = (values: UserLoginData) => {
        mutate(values);
    }

    const redirectToRegister = () => {
        navigate("/auth/register");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-5", className)}>
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
                    className="w-full bg-primary"
                    disabled={isPending}
                >
                    Login
                </Button>

                <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    onClick={redirectToRegister}
                >
                    Register
                </Button>
            </form>
        </Form>
    );
};

export default AuthLoginForm;
