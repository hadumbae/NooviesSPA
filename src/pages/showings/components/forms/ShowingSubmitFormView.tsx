/**
 * @fileoverview
 * Form view component for creating or editing a {@link Showing} entity.
 *
 * This component orchestrates the full Showing submission flow, including:
 * - Rendering grouped fieldsets for details, languages, date/time, and status.
 * - Integrating `react-hook-form` for validation and state management.
 * - Supporting conditional disabling of fields via Zod schemas.
 * - Handling submission through a TanStack Query mutation.
 *
 * @remarks
 * This file adheres to the `#ts-docs-standard-format`:
 * 1. File-level documentation
 * 2. Types & interfaces with full comments
 * 3. Component-level documentation with examples
 */

import {FC} from 'react';
import {UseMutationResult} from "@tanstack/react-query";
import {SubmitHandler, UseFormReturn} from "react-hook-form";

import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";

import {cn} from "@/common/lib/utils.ts";
import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";
import {ShowingForm} from "@/pages/showings/schema/form/ShowingForm.types.ts";
import {ShowingFormValues} from "@/pages/showings/schema/form/ShowingFormValues.types.ts";
import ShowingSubmitFormDetailsFieldset
    from "@/pages/showings/components/forms/fieldsets/ShowingSubmitFormDetailsFieldset.tsx";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {ShowingFormValuesSchema} from "@/pages/showings/schema/form/ShowingFormValues.schema.ts";
import ShowingSubmitFormDateTimeFieldset
    from "@/pages/showings/components/forms/fieldsets/ShowingSubmitFormDateTimeFieldset.tsx";
import ShowingSubmitFormLanguagesFieldset
    from "@/pages/showings/components/forms/fieldsets/ShowingSubmitFormLanguagesFieldset.tsx";
import ShowingSubmitFormStatusFieldset
    from "@/pages/showings/components/forms/fieldsets/ShowingSubmitFormStatusFieldset.tsx";
import {X} from "lucide-react";

/**
 * Props for {@link ShowingSubmitFormView}.
 *
 * @property mutation - The TanStack Query mutation managing submission state and results.
 * @property form - The `react-hook-form` instance controlling validation and input bindings.
 * @property submitHandler - Callback executed when the form is submitted.
 * @property disableFields - Optional array of field keys that should be disabled in the UI.
 * @property className - Optional Tailwind utility classes for the root form container.
 */
export type FormViewProps = {
    mutation: UseMutationResult<Showing, unknown, ShowingForm>;
    form: UseFormReturn<ShowingFormValues>;
    submitHandler: SubmitHandler<ShowingFormValues>;
    disableFields?: (keyof ShowingFormValues)[];
    className?: string;
};

/**
 * Main form component for creating or updating a Showing.
 *
 * @remarks
 * The form is assembled from four fieldsets:
 * - Details
 * - Languages
 * - Date & Time
 * - Status
 *
 * Field visibility is automatically determined by the Zod schema and
 * the optional `disableFields` prop using {@link getActiveSchemaInputFields}.
 *
 * The component automatically:
 * - Manages submission state feedback (pending/success)
 * - Disables the submit button during mutation
 * - Provides a reset button to restore default values
 *
 * @example
 * ```tsx
 * <ShowingSubmitFormView
 *   form={form}
 *   mutation={mutation}
 *   submitHandler={onSubmit}
 *   disableFields={["status", "ticketPrice"]}
 *   className="p-4"
 * />
 * ```
 *
 * @category Components
 */
const ShowingSubmitFormView: FC<FormViewProps> = (props) => {
    const {form, mutation, submitHandler, disableFields, className} = props;

    const {isPending, isSuccess} = mutation;

    /** Field activation map controlling visibility & interactivity */
    const activeFields = getActiveSchemaInputFields({
        schema: ShowingFormValuesSchema,
        disableFields
    });

    const resetForm = () => form.reset();

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-3", className)}
            >
                {/*Details*/}

                <ShowingSubmitFormDetailsFieldset
                    form={form}
                    activeFields={activeFields}
                />

                {/*Languages*/}

                <ShowingSubmitFormLanguagesFieldset
                    form={form}
                    activeFields={activeFields}
                />

                {/*Date & Time*/}

                <ShowingSubmitFormDateTimeFieldset
                    form={form}
                    activeFields={activeFields}
                />

                {/*Status*/}

                <ShowingSubmitFormStatusFieldset
                    form={form}
                    activeFields={activeFields}
                />

                {/*Submit*/}

                <div className="flex items-center space-x-2">
                    <Button
                        type="submit"
                        variant="primary"
                        className="flex-1"
                        disabled={isPending || isSuccess}
                    >
                        Submit
                    </Button>

                    <Button type="button" variant="secondary" onClick={resetForm}>
                        <X/>
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default ShowingSubmitFormView;
