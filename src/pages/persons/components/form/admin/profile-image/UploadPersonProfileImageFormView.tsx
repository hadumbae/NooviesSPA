import {FC} from 'react';
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Loader} from "lucide-react";
import HookFormFileInput from "@/common/components/forms/HookFormFileInput.tsx";
import {PersonProfileImageForm, PersonProfileImageFormValues} from "@/pages/persons/schema/forms/PersonForm.types.ts";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for `UploadPersonProfileImageFormView`.
 *
 * @template TForm - The form instance type returned by `react-hook-form`.
 * @property form - The `react-hook-form` instance controlling the form state.
 * @property submitHandler - Callback function executed on form submission.
 * @property mutation - Mutation object from `react-query` to track submission status.
 * @property className - Optional CSS class to apply to the form container.
 */
type ViewProps<TForm = UseFormReturn<PersonProfileImageFormValues>> = {
    form: TForm;
    submitHandler: SubmitHandler<PersonProfileImageFormValues>;
    mutation: UseMutationResult<any, unknown, PersonProfileImageForm>;
    className?: string;
};

/**
 * Presentational form component for uploading a person's profile image.
 *
 * @remarks
 * - Renders a file input for the profile image using `HookFormFileInput`.
 * - Includes a submit button that shows a spinner when the mutation is pending.
 * - Uses `react-hook-form` for form state management and validation.
 * - Integrates with a `react-query` mutation to submit the form data.
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
const UploadPersonProfileImageFormView: FC<ViewProps> = (props) => {
    const {form, submitHandler, className, mutation: {isPending}} = props;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-4", className)}
            >
                <HookFormFileInput
                    name="profileImage"
                    label="Profile Image"
                    control={form.control}
                />

                <Button
                    className="w-full bg-primary"
                    type="submit"
                    variant="default"
                    disabled={isPending}
                >
                    {isPending ? <Loader className="animate-spin"/> : "Submit"}
                </Button>
            </form>
        </Form>
    );
};

export default UploadPersonProfileImageFormView;
