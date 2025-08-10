import {FC} from 'react';
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Loader} from "lucide-react";
import HookFormFileInput from "@/common/components/forms/HookFormFileInput.tsx";
import {PersonProfileImageForm} from "@/pages/persons/schema/forms/PersonForm.types.ts";

type ViewProps<TForm = UseFormReturn<PersonProfileImageForm>> = {
    form: TForm;
    submitHandler: SubmitHandler<PersonProfileImageForm>;
    mutation: UseMutationResult<any, Error, PersonProfileImageForm>
}

const UploadPersonProfileImageFormView: FC<ViewProps> = ({form, submitHandler, mutation}) => {
    const {isPending} = mutation;
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">

                <HookFormFileInput name="profileImage" label="Profile Image" control={form.control} />

                <Button className="w-full bg-primary" type="submit" variant="default" disabled={isPending} >
                    {isPending ? <Loader className="animate-spin"/> : "Submit"}
                </Button>
            </form>
        </Form>
    );
};

export default UploadPersonProfileImageFormView;
