import {FC} from 'react';
import useAuthRegisterForm from "@/pages/auth/hooks/useAuthRegisterForm.ts";
import useAuthRegisterSubmitMutation from "@/pages/auth/hooks/useAuthRegisterSubmitMutation.ts";
import {UserRegisterData} from "@/pages/auth/schema/AuthRegisterSchema.ts";
import {Form} from "@/common/components/ui/form.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import useLoggedNavigate from "@/common/hooks/useLoggedNavigate.ts";

const AuthRegisterForm: FC = () => {
    const navigate = useLoggedNavigate();
    const form = useAuthRegisterForm();
    const {mutate} = useAuthRegisterSubmitMutation({form});

    const onSubmit = (values: UserRegisterData) => mutate(values);
    const redirectToLogin = () => navigate({to: "/auth/login", component: AuthRegisterForm.name});

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <HookFormInput name="name" label="Name" control={form.control} />
                <HookFormInput name="email" label="Email" type="email" control={form.control} />
                <HookFormInput name="password" label="Password" type="password" control={form.control} />
                <HookFormInput name="confirm" label="Confirm Password" type="password" control={form.control} />

                <Button variant="default" type="submit" className="w-full bg-primary">
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

export default AuthRegisterForm;
