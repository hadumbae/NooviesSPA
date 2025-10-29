import { FC } from 'react';
import { TheatreForm, TheatreFormValues } from "@/pages/theatres/schema/forms/TheatreForm.types.ts";
import { Theatre } from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import { Form } from "@/common/components/ui/form.tsx";
import { cn } from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import { Button } from "@/common/components/ui/button.tsx";
import TheatreSubmitFormLocationInputs
    from "@/pages/theatres/components/theatre-submit-form/TheatreSubmitFormLocationInputs.tsx";
import { Separator } from "@/common/components/ui/separator.tsx";
import { FormViewProps } from "@/common/type/form/HookFormProps.ts";

/**
 * Props for {@link TheatreSubmitFormView}.
 *
 * @property form - `react-hook-form` object managing the theatre form state.
 * @property submitHandler - Function called when the form is submitted.
 * @property mutation - Mutation object from `@tanstack/react-query` handling submission state.
 * @property disableFields - Optional array of form fields to disable (`"name"`, `"location"`, `"seatCapacity"`).
 * @property className - Optional CSS classes applied to the main field container.
 */
type TheatreSubmitFormViewProps = FormViewProps<Theatre, TheatreForm, TheatreFormValues> & {
    className?: string;
};

/**
 * **TheatreSubmitFormView**
 *
 * Presentational form component for creating or editing a theatre.
 *
 * Features:
 * - Integrates with `react-hook-form` for form state and validation.
 * - Uses `HookFormInput` for individual input fields.
 * - Dynamically disables fields based on `disableFields`.
 * - Handles theatre location input via `TheatreSubmitFormLocationInputs`.
 * - Submit button is disabled when mutation is pending or has succeeded.
 *
 * @param params - Props including `form`, `submitHandler`, `mutation`, `disableFields`, and `className`.
 *
 * @example
 * ```tsx
 * import useTheatreSubmitForm from "@/pages/theatres/hooks/forms/useTheatreSubmitForm.ts";
 * import useTheatreSubmitMutation from "@/pages/theatres/hooks/features/submit-form/useTheatreSubmitMutation.ts";
 *
 * const form = useTheatreSubmitForm({ presetValues: { name: "Grand Theatre" } });
 * const mutation = useTheatreSubmitMutation({ form, isEditing: false });
 *
 * <TheatreSubmitFormView
 *   form={form}
 *   submitHandler={form.handleSubmit(values => mutation.mutate(values))}
 *   mutation={mutation}
 *   disableFields={["seatCapacity"]}
 *   className="max-w-lg"
 * />
 * ```
 */
const TheatreSubmitFormView: FC<TheatreSubmitFormViewProps> = (params) => {
    const { form, submitHandler, mutation, disableFields, className } = params;
    const { isPending, isSuccess } = mutation;

    const activeFields = {
        name: !disableFields?.includes("name"),
        location: !disableFields?.includes("location"),
        seatCapacity: !disableFields?.includes("seatCapacity"),
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-8")}
            >
                <fieldset className="space-y-4">
                    <section>
                        <h1 className="text-lg font-bold">Theatre</h1>
                        <Separator />
                    </section>

                    <section className={cn("grid grid-cols-1 gap-4", className)}>
                        {activeFields["name"] &&
                            <HookFormInput name="name" label="Name" control={form.control} />}
                        {activeFields["seatCapacity"] &&
                            <HookFormInput
                                name="seatCapacity"
                                label="Number Of Seats (Capacity)"
                                type="number"
                                min={0}
                                control={form.control}
                            />}
                    </section>
                </fieldset>

                {activeFields["location"] &&
                    <TheatreSubmitFormLocationInputs form={form} />}

                <Button
                    type="submit"
                    variant="default"
                    className="w-full bg-primary"
                    disabled={isPending || isSuccess}
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default TheatreSubmitFormView;
