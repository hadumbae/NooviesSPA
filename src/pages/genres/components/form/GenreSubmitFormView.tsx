import {FC} from 'react';
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {GenreForm, GenreFormValues} from "@/pages/genres/schema/form/GenreForm.types.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Form} from "@/common/components/ui/form.tsx";
import {UseMutationResult} from "@tanstack/react-query";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";
import {cn} from "@/common/lib/utils.ts";

type FormViewProps = {
    /**
     * React Hook Form instance controlling form state and validation.
     */
    form: UseFormReturn<GenreFormValues>;

    /**
     * Submission handler invoked when the form is submitted.
     * Receives the validated form values.
     */
    submitHandler: SubmitHandler<GenreFormValues>;

    /**
     * Mutation instance handling form submission requests.
     * Provides status flags (e.g., `isPending`) and mutation callbacks.
     */
    mutation: UseMutationResult<Genre, Error, GenreForm>;

    /**
     * Optional list of fields to disable in the form.
     *
     * When a field key is included, its corresponding input will not render.
     */
    disableFields?: (keyof GenreFormValues)[];

    /**
     * Optional CSS class applied to the form container.
     *
     * Can be used for layout or spacing adjustments.
     */
    className?: string;
};

/**
 * Presentational form component for creating or editing a genre.
 *
 * Renders:
 * - **Name input** (optional, can be disabled via `disableFields`)
 * - **Description textarea** (optional, can be disabled via `disableFields`)
 * - **Submit button** (disabled while mutation is pending)
 *
 * The form is controlled by `react-hook-form` and connected to a mutation
 * that performs the API submission.
 *
 * @param {FormViewProps} params - Props controlling form rendering and behavior.
 *
 * @example
 * ```tsx
 * <GenreSubmitFormView
 *   form={form}
 *   submitHandler={handleSubmit}
 *   mutation={mutation}
 *   disableFields={["name"]}
 *   className="mt-4"
 * />
 * ```
 */
const GenreSubmitFormView: FC<FormViewProps> = (params) => {
    const {form, submitHandler, disableFields, mutation, className} = params;
    const {isPending} = mutation;

    const activeFields = {
        name: !disableFields?.includes("name"),
        description: !disableFields?.includes("description"),
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-5", className)}>
                {
                    activeFields["name"] &&
                    <HookFormInput
                        name="name"
                        label="Name"
                        description="The name of the genre."
                        control={form.control}
                    />
                }

                {
                    activeFields["description"] &&
                    <HookFormTextArea
                        name="description"
                        label="Description"
                        control={form.control}
                        description="The description of the genre."
                    />
                }

                <Button
                    className="w-full bg-primary"
                    disabled={isPending}
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default GenreSubmitFormView;
