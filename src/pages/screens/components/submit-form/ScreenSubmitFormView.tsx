import {FC} from 'react';
import {Form} from "@/common/components/ui/form.tsx";
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import ScreenTypeHookFormSelect from "@/pages/screens/components/submit-form/inputs/ScreenTypeHookFormSelect.tsx";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ScreenForm, ScreenFormValues} from "@/pages/screens/schema/forms/ScreenForm.types.ts";
import {FormViewProps} from "@/common/type/form/HookFormProps.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {ScreenFormContext} from "@/pages/screens/contexts/screen-form/ScreenFormContext.ts";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {ScreenFormValuesSchema} from "@/pages/screens/schema/forms/ScreenForm.schema.ts";
import TheatreHookFormSelect from "@/pages/theatres/components/admin/form/theatre-inputs/TheatreHookFormSelect.tsx";

/**
 * Props for `ScreenSubmitFormView`.
 *
 * Extends generic form view props and adds optional styling for the form
 * container and submit button text.
 *
 * @template TSchema extends ScreenDetails
 * @template TForm extends ScreenForm
 * @template TValues extends ScreenFormValues
 */
type ViewProps = FormViewProps<ScreenDetails, ScreenForm, ScreenFormValues> & {
    /** Optional CSS class names applied to the form wrapper. */
    className?: string;
};

/**
 * Form view for creating or editing a `Screen`.
 *
 * Renders active fields determined by the schema and context-level disabled
 * field configuration. Integrates with React Hook Form for validation and
 * React Query for mutation state.
 *
 * @param params - Component props
 * @param params.form - React Hook Form instance for managing state and validation
 * @param params.mutation - React Query mutation controlling submit state
 * @param params.submitHandler - Form submission handler
 * @param params.className - Optional extra class name for the wrapper
 * @param params.submitButtonText - Label for the submit button (default: "Submit")
 *
 * @returns Rendered form bound to form controls and schema-defined fields
 *
 * @example
 * ```tsx
 * <ScreenSubmitFormView
 *   form={form}
 *   mutation={mutation}
 *   submitHandler={onSubmit}
 *   disableFields={["theatre"]}
 * />
 * ```
 */
const ScreenSubmitFormView: FC<ViewProps> = (params) => {
    // --- Props ---
    const {
        form,
        submitHandler,
        mutation: {isPending},
        className,
        submitButtonText = "Submit",
    } = params;

    // --- Access Context ---
    const {options: {disableFields} = {}} = useRequiredContext({context: ScreenFormContext});

    // --- Active Fields Resolution ---
    const activeFields = getActiveSchemaInputFields({
        schema: ScreenFormValuesSchema,
        disableFields: disableFields,
    });

    // --- Render ---
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-4", className)}
            >
                {activeFields["theatre"] && (
                    <TheatreHookFormSelect
                        control={form.control}
                        isDisabled={isPending}
                        name="theatre"
                        label="Theatre"
                    />
                )}

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
