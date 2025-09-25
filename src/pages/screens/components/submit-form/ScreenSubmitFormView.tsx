import { FC } from 'react';
import { Form } from "@/common/components/ui/form.tsx";
import { cn } from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import { Button } from "@/common/components/ui/button.tsx";
import TheatreHookFormSelect from "@/pages/theatres/components/TheatreHookFormSelect.tsx";
import ScreenTypeHookFormSelect from "@/pages/screens/components/submit-form/inputs/ScreenTypeHookFormSelect.tsx";
import { Screen } from "@/pages/screens/schema/screen/Screen.types.ts";
import { ScreenForm, ScreenFormValues } from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import { FormViewProps } from "@/common/type/form/HookFormProps.ts";

/**
 * Props for the `ScreenSubmitFormView` component.
 *
 * Combines generic form view props with optional styling and
 * UI-level field control.
 */
type ViewProps = FormViewProps<Screen, ScreenForm, ScreenFormValues> & {
    /** Optional CSS class names to apply to the form container */
    className?: string;

    /** Optional array of form field keys to disable */
    disableFields?: (keyof ScreenFormValues)[];
};

/**
 * Form view component for submitting or editing a `Screen` entity.
 *
 * Renders form fields using React Hook Form and supports:
 * - Disabling specific fields via `disableFields`
 * - Submitting data via a React Query mutation
 * - Showing loading state on the submit button while the mutation is pending
 *
 * @param params - Props controlling form behavior, mutation, and UI
 * @param params.form - React Hook Form instance for managing form state and validation
 * @param params.mutation - React Query mutation object for handling form submission
 * @param params.submitHandler - Function called when the form is submitted
 * @param params.className - Optional CSS class applied to the form wrapper
 * @param params.submitButtonText - Optional text for the submit button (default: `"Submit"`)
 * @param params.disableFields - Optional array of field keys to disable
 * @returns A fully controlled form view component for screens
 *
 * @example
 * ```tsx
 * <ScreenSubmitFormView
 *   form={form}
 *   mutation={mutation}
 *   submitHandler={onSubmit}
 *   disableFields={['theatre']}
 * />
 * ```
 */
const ScreenSubmitFormView: FC<ViewProps> = (params) => {
    const { form, mutation, submitHandler, className, submitButtonText = "Submit", disableFields = [] } = params;
    const { isPending } = mutation;

    // Determine which fields should be active based on `disableFields`
    const activeFields = {
        name: !disableFields.includes("name"),
        capacity: !disableFields.includes("capacity"),
        screenType: !disableFields.includes("screenType"),
        theatre: !disableFields.includes("theatre"),
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-4", className)}
            >
                {activeFields["name"] && (
                    <HookFormInput
                        name="name"
                        label="Name"
                        disabled={isPending}
                        control={form.control}
                    />
                )}

                {activeFields["capacity"] && (
                    <HookFormInput
                        name="capacity"
                        label="Capacity"
                        disabled={isPending}
                        control={form.control}
                        type="number"
                        min={0}
                    />
                )}

                {activeFields["screenType"] && (
                    <ScreenTypeHookFormSelect
                        control={form.control}
                        isDisabled={isPending}
                        name="screenType"
                        label="Screen Type"
                    />
                )}

                {activeFields["theatre"] && (
                    <TheatreHookFormSelect
                        control={form.control}
                        isDisabled={isPending}
                        name="theatre"
                        label="Theatre"
                    />
                )}

                <Button
                    type="submit"
                    variant="default"
                    className="w-full bg-primary"
                    disabled={isPending}
                >
                    {submitButtonText}
                </Button>
            </form>
        </Form>
    );
};

export default ScreenSubmitFormView;
