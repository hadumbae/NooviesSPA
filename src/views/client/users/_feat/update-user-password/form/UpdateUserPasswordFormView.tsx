import {ReactElement} from 'react';
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UserPasswordUpdateFormData} from "@/domains/users/_feat/update-password/schema/UserPasswordUpdateFormSchema.ts";
import {UseMutationResult} from "@tanstack/react-query";
import {Form} from "@/common/components/ui/form.tsx";
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Loader} from "lucide-react";

type FormProps = {
    form: UseFormReturn<UserPasswordUpdateFormData>;
    mutation: UseMutationResult<void, Error, UserPasswordUpdateFormData>;
    submitHandler: SubmitHandler<UserPasswordUpdateFormData>;
    className?: string;
}

export function UpdateUserPasswordFormView(params: FormProps): ReactElement {
    const {form, submitHandler, className, mutation: {isPending}} = params;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-4", className)}
            >
                <section className="grid grid-cols-3">
                    <span className="pt-2">Password</span>

                    <HookFormInput
                        name="password"
                        label="Password"
                        type="password"
                        control={form.control}
                        hasLabel={false}
                        className="col-span-2"
                    />
                </section>

                <section className="grid grid-cols-3">
                    <span className="pt-2">Confirm</span>

                    <HookFormInput
                        name="confirm"
                        label="Confirm"
                        type="password"
                        control={form.control}
                        hasLabel={false}
                        className="col-span-2"
                    />
                </section>


                <section className="flex justify-end">
                    <Button type="submit" variant="default" className="w-full bg-primary" disabled={isPending}>
                        {isPending ? <Loader className="animate-spin" /> : "Update"}
                    </Button>
                </section>

            </form>
        </Form>
    );
}
