import {FC} from 'react';
import {TheatreForm, TheatreFormValues} from "@/pages/theatres/schema/forms/TheatreForm.types.ts";
import {Theatre} from "@/pages/theatres/schema/model/theatre/Theatre.types.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {FormViewProps} from "@/common/type/form/HookFormProps.ts";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {TheatreFormValuesSchema} from "@/pages/theatres/schema/forms/TheatreForm.schema.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {PrimaryButtonCSS} from "@/common/constants/css/ButtonCSS.ts";
import TheatreSubmitFormLocationInputs
    from "@/pages/theatres/components/admin/form/theatre-submit-form/TheatreSubmitFormLocationInputs.tsx";

/**
 * Props for {@link TheatreSubmitFormView}.
 *
 * Extends a generic {@link FormViewProps} object used by all form
 * view components across the application.
 *
 * @property isPanel - If `true`, the layout collapses into a single-column panel-style layout.
 * @property className - Optional CSS classes applied to the root `<form>` container.
 *
 * Inherited from {@link FormViewProps}:
 * - **form** – Fully initialized `react-hook-form` instance.
 * - **submitHandler** – Handler invoked when the form is submitted.
 * - **mutation** – React Query mutation object containing `isPending`, `isSuccess`, etc.
 * - **disableFields** – Fields that should not render or be interactive.
 */
type TheatreSubmitFormViewProps = FormViewProps<Theatre, TheatreForm, TheatreFormValues> & {
    isPanel?: boolean;
    className?: string;
};

/**
 * **TheatreSubmitFormView**
 *
 * Pure presentational component that renders the theatre form UI.
 *
 * It does not manage logic, state, or mutations itself—those responsibilities
 * belong to the container (`TheatreSubmitFormContainer`).
 * This component focuses solely on rendering fields, grouping them logically,
 * and providing a consistent layout.
 *
 * ---
 *
 * ### Features
 *
 * - Renders theatre fields including:
 *   - **Name**
 *   - **Seat Capacity**
 *   - **Location** (via {@link TheatreSubmitFormLocationInputs})
 *
 * - Automatically disables fields listed in `disableFields`.
 *
 * - Uses the shared `<Form />` wrapper to connect to `react-hook-form`.
 *
 * - Submission is routed through the provided `submitHandler`.
 *
 * - Submit button auto-disables when:
 *   - Mutation is pending
 *   - Mutation has succeeded (to prevent resubmission)
 *
 * - Supports a panel mode via `isPanel`, adjusting layout appropriately.
 *
 * ---
 *
 * @param params - Props including form state, handlers, mutation, disabled fields, and visual layout options.
 *
 * @example
 * ```tsx
 * import useTheatreSubmitForm from "@/pages/theatres/hooks/forms/useTheatreSubmitForm.ts";
 * import useTheatreSubmitMutation from "@/pages/theatres/hooks/features/submit-form/useTheatreSubmitMutation.ts";
 *
 * const form = useTheatreSubmitForm({ presetValues: { name: "City Theatre" } });
 * const mutation = useTheatreSubmitMutation({ isEditing: false, form });
 *
 * <TheatreSubmitFormView
 *   form={form}
 *   submitHandler={values => mutation.mutate(values)}
 *   mutation={mutation}
 *   disableFields={["seatCapacity"]}
 *   className="p-4"
 * />
 * ```
 *
 * @component
 */
const TheatreSubmitFormView: FC<TheatreSubmitFormViewProps> = (params) => {
    // ⚡ Props ⚡
    const {
        form,
        submitHandler,
        disableFields,
        className,
        mutation: {isPending, isSuccess},
        isPanel = false
    } = params;

    // ⚡ Active Fields ⚡
    const activeFields = getActiveSchemaInputFields({
        schema: TheatreFormValuesSchema,
        disableFields,
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("grid grid-cols-1 gap-4", !isPanel && "lg:grid-cols-2", className)}
            >
                <fieldset className="space-y-4">
                    <div>
                        <PrimaryHeaderText>Theatre</PrimaryHeaderText>
                        <Separator/>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {
                            activeFields.name &&
                            <HookFormInput
                                name="name"
                                label="Name"
                                control={form.control}
                            />
                        }

                        {
                            activeFields.seatCapacity &&
                            <HookFormInput
                                name="seatCapacity"
                                label="Number Of Seats (Capacity)"
                                type="number"
                                min={0}
                                control={form.control}
                            />
                        }
                    </div>
                </fieldset>

                {
                    activeFields.location &&
                    <TheatreSubmitFormLocationInputs form={form}/>
                }

                <div className={cn(!isPanel && "lg:col-span-2")}>
                    <Button
                        type="submit"
                        variant="default"
                        className={cn(PrimaryButtonCSS, "w-full")}
                        disabled={isPending || isSuccess}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default TheatreSubmitFormView;
