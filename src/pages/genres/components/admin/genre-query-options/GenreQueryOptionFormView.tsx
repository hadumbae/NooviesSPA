/**
 * @fileoverview Presentation component for the Genre Query Option form.
 *
 * Renders form inputs for genre name and sort options, integrates with React Hook Form,
 * and uses {@link useDebouncedFormAutoSubmit} to automatically submit changes after a delay.
 */

import { FC } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { GenreQueryOptionFormValues } from "@/pages/genres/schema/filters/GenreQueryOptionForm.types.ts";
import { Form } from "@/common/components/ui/form.tsx";
import { cn } from "@/common/lib/utils.ts";
import useDebouncedFormAutoSubmit from "@/common/hooks/forms/useDebouncedFormAutoSubmit.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormSortToggle from "@/common/components/forms/HookFormSortToggle.tsx";

/**
 * Props for {@link GenreQueryOptionFormView}.
 */
type FormViewProps = {
    /**
     * The React Hook Form instance controlling this form.
     */
    form: UseFormReturn<GenreQueryOptionFormValues>;

    /**
     * Handler function called on form submission.
     * Used internally by {@link useDebouncedFormAutoSubmit}.
     */
    submitHandler: SubmitHandler<GenreQueryOptionFormValues>;

    /**
     * Optional list of field names to disable (hide) from rendering.
     * Useful when rendering a subset of the full form.
     */
    disableFields?: (keyof GenreQueryOptionFormValues)[];

    /**
     * Optional CSS class name to customize form layout.
     */
    className?: string;
};

/**
 * React component rendering the Genre Query Option form view.
 *
 * Provides input fields for:
 * - `name` (genre name filter)
 * - `sortByName` (sorting order)
 *
 * Automatically triggers submission after user input stops for 450ms
 * using {@link useDebouncedFormAutoSubmit}.
 *
 * @param {FormViewProps} props - Component props including form control and submission logic.
 * @returns {JSX.Element} Rendered form view.
 *
 * @example
 * ```tsx
 * const form = useGenreQueryOptionForm();
 *
 * const handleSubmit: SubmitHandler<GenreQueryOptionFormValues> = (values) => {
 *   console.log("Submitted:", values);
 * };
 *
 * <GenreQueryOptionFormView
 *   form={form}
 *   submitHandler={handleSubmit}
 *   disableFields={["sortByName"]}
 *   className="space-y-4"
 * />;
 * ```
 */
const GenreQueryOptionFormView: FC<FormViewProps> = (props) => {
    const { form, submitHandler, className, disableFields } = props;

    // Automatically submit form values after debounce timeout
    useDebouncedFormAutoSubmit({ form, submitHandler, timeout: 450 });

    const activeFields = {
        name: !disableFields?.includes("name"),
        sortByName: !disableFields?.includes("sortByName"),
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn(className)}>
                {activeFields["name"] && (
                    <HookFormInput
                        name="name"
                        label="Name"
                        control={form.control}
                    />
                )}

                {activeFields["sortByName"] && (
                    <HookFormSortToggle
                        name="sortByName"
                        label="Sort By Name"
                        control={form.control}
                    />
                )}
            </form>
        </Form>
    );
};

export default GenreQueryOptionFormView;
