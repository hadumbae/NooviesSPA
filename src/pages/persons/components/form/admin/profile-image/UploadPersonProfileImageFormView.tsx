import {FC} from 'react';
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Loader} from "lucide-react";
import HookFormFileInput from "@/common/components/forms/HookFormFileInput.tsx";
import {PersonProfileImageForm, PersonProfileImageFormValues} from "@/pages/persons/schema/forms/PersonForm.types.ts";

/**
 * Props for {@link UploadPersonProfileImageFormView}.
 *
 * @template TForm - The type of the react-hook-form instance. Defaults to {@link UseFormReturn} for {@link PersonProfileImageFormValues}.
 */
type ViewProps<TForm = UseFormReturn<PersonProfileImageFormValues>> = {
    /**
     * The react-hook-form instance controlling the profile image form.
     */
    form: TForm;

    /**
     * Handler invoked when the form is submitted.
     *
     * @param values - The current form values of type {@link PersonProfileImageFormValues}.
     */
    submitHandler: SubmitHandler<PersonProfileImageFormValues>;

    /**
     * The mutation object returned by the profile image submission hook.
     * Used to determine submission state (`isPending`) and trigger mutations.
     */
    mutation: UseMutationResult<any, unknown, PersonProfileImageForm>;
};

/**
 * Form view for uploading a profile image for a `Person`.
 *
 * Renders:
 * - A file input for the profile image.
 * - A submit button that displays a loading spinner while the mutation is pending.
 *
 * @param props - {@link ViewProps}
 *
 * @example
 * ```tsx
 * <UploadPersonProfileImageFormView
 *   form={form}
 *   submitHandler={handleSubmit}
 *   mutation={mutation}
 * />
 * ```
 */
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
