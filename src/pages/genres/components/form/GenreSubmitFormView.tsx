import { FC } from 'react';
import { GenreForm, GenreFormValues } from "@/pages/genres/schema/form/GenreForm.types.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import { Button } from "@/common/components/ui/button.tsx";
import { Form } from "@/common/components/ui/form.tsx";
import { Genre } from "@/pages/genres/schema/genre/Genre.types.ts";
import { cn } from "@/common/lib/utils.ts";
import { FormViewProps } from "@/common/type/form/HookFormProps.ts";
import {PrimaryButtonCSS} from "@/common/constants/css/ButtonCSS.ts";

/**
 * Props for the {@link GenreSubmitFormView} component.
 *
 * @remarks
 * Extends the generic {@link FormViewProps} for `Genre` entities,
 * defining configuration for form handling, mutation state, and field control.
 *
 * @property disableFields - Optional list of field keys to disable in the form.
 * @property className - Optional class name for custom styling.
 */
type GenreFormViewProps = FormViewProps<Genre, GenreForm, GenreFormValues> & {
    disableFields?: (keyof GenreFormValues)[];
    className?: string;
};

/**
 * Renders a form view for creating or updating a {@link Genre}.
 *
 * @remarks
 * The form is fully integrated with React Hook Form and provides
 * inputs for a genre’s name and description.
 *
 * - Controlled by the `form` prop (React Hook Form instance).
 * - The `mutation` prop provides submission status for disabling the button.
 * - Specific fields can be hidden or disabled using `disableFields`.
 *
 * @example
 * ```tsx
 * <GenreSubmitFormView
 *   form={form}
 *   submitHandler={onSubmit}
 *   mutation={mutation}
 * />
 * ```
 */
const GenreSubmitFormView: FC<GenreFormViewProps> = (params) => {
    const { form, submitHandler, disableFields, mutation, className } = params;
    const { isPending } = mutation;

    /** Determines which form fields should be rendered based on `disableFields`. */
    const activeFields = {
        name: !disableFields?.includes("name"),
        description: !disableFields?.includes("description"),
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-5", className)}>
                {activeFields["name"] && (
                    <HookFormInput
                        name="name"
                        label="Name"
                        description="The name of the genre."
                        control={form.control}
                    />
                )}

                {activeFields["description"] && (
                    <HookFormTextArea
                        name="description"
                        label="Description"
                        control={form.control}
                        description="The description of the genre."
                    />
                )}

                <Button
                    className={cn(PrimaryButtonCSS, "w-full")}
                    disabled={isPending}
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default GenreSubmitFormView;
