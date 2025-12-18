/**
 * Showing Submit Form Container
 *
 * Container component responsible for creating or editing a showing.
 * Manages form state, multi-step flow, mutation logic, and persistence.
 *
 * Responsibilities:
 * - Initialize form state via `useShowingSubmitForm`
 * - Handle create/update mutations with `useShowingSubmitMutation`
 * - Define and manage multi-step form configuration
 * - Persist intermediate state in `localStorage`
 * - Reset state and storage after successful submission
 *
 * Form steps:
 * 1. Details
 * 2. Languages
 * 3. Date & Time
 * 4. Status
 *
 * @example
 * ```tsx
 * <ShowingSubmitFormContainer
 *     entity={existingShowing}
 *     theatreTimezone="Asia/Bangkok"
 *     onSubmitSuccess={(showing) => console.log("Submitted", showing)}
 * />
 * ```
 */

import {FC} from "react";

import useShowingSubmitForm from "@/pages/showings/hooks/forms/useShowingSubmitForm.ts";
import useShowingSubmitMutation from "@/pages/showings/hooks/mutations/useShowingSubmitMutation.ts";

import {Showing, ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {IANATimezone} from "@/common/schema/date-time/IANATimezone.schema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {ShowingFormValues} from "@/pages/showings/schema/form/ShowingFormValues.types.ts";
import {FormStep} from "@/common/type/form/SteppedFormTypes.ts";
import {ChevronRight, Clock, Languages, ListCollapse} from "lucide-react";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {
    ShowingFormDateTimeValuesSchema,
    ShowingFormDetailValuesSchema,
    ShowingFormLanguageValuesSchema,
    ShowingFormStatusValuesSchema,
    ShowingFormValuesSchema
} from "@/pages/showings/schema/form/ShowingFormValues.schema.ts";
import ShowingSubmitFormDetailsFieldset
    from "@/pages/showings/components/forms/fieldsets/ShowingSubmitFormDetailsFieldset.tsx";
import ShowingSubmitFormLanguagesFieldset
    from "@/pages/showings/components/forms/fieldsets/ShowingSubmitFormLanguagesFieldset.tsx";
import MultiStepForm from "@/common/components/forms/multi-step-form/MultiStepForm.tsx";
import ShowingSubmitFormDateTimeFieldset
    from "@/pages/showings/components/forms/fieldsets/ShowingSubmitFormDateTimeFieldset.tsx";
import ShowingSubmitFormStatusFieldset
    from "@/pages/showings/components/forms/fieldsets/ShowingSubmitFormStatusFieldset.tsx";
import getSchemaFieldKeys from "@/common/utility/features/zod/getSchemaFieldKeys.ts";
import {ShowingForm} from "@/pages/showings/schema/form/ShowingForm.types.ts";
import buildFormSubmitLog from "@/common/utility/features/logger/buildFormSubmitLog.ts";

/**
 * Editing-specific props for the submit form.
 *
 * When provided, the form operates in edit mode.
 */
type ShowingEditingProps =
    | { entity: Showing; theatreTimezone: IANATimezone }
    | { entity?: never; theatreTimezone?: never };

/**
 * Props for {@link ShowingSubmitFormContainer}.
 *
 * Combines form options, mutation callbacks, and optional editing context.
 */
type SubmitContainerProps =
    MutationOnSubmitParams<ShowingDetails>
    & FormOptions<ShowingFormValues>
    & ShowingEditingProps
    & {
    /** Optional wrapper class name */
    className?: string;
};

/**
 * Container component for submitting showing data.
 *
 * Orchestrates form state, step configuration, and submission lifecycle
 * for both create and edit flows.
 */
const ShowingSubmitFormContainer: FC<SubmitContainerProps> = (props) => {
    const {entity: showing, theatreTimezone, disableFields, presetValues, ...onSubmitProps} = props;
    const {onSubmitSuccess} = onSubmitProps;

    // --- Setup ---
    const formProps = showing ? {showing, theatreTimezone} : {};
    const form = useShowingSubmitForm({presetValues, ...formProps});

    const localStorageKey = showing
        ? `edit-showing-submit-form-${showing._id}`
        : "showing-submit-form";

    const activeFields = getActiveSchemaInputFields({
        schema: ShowingFormValuesSchema,
        disableFields
    });

    // --- Steps ---
    const steps: FormStep<ShowingFormValues>[] = [
        {
            title: "Details",
            stepCount: 1,
            icon: ListCollapse,
            fields: getSchemaFieldKeys(ShowingFormDetailValuesSchema),
            component: (
                <ShowingSubmitFormDetailsFieldset
                    activeFields={activeFields}
                    form={form}
                />
            ),
        },
        {
            title: "Languages",
            stepCount: 2,
            icon: Languages,
            fields: getSchemaFieldKeys(ShowingFormLanguageValuesSchema),
            component: (
                <ShowingSubmitFormLanguagesFieldset
                    activeFields={activeFields}
                    form={form}
                />
            ),
        },
        {
            title: "Date & Time",
            stepCount: 3,
            icon: Clock,
            fields: getSchemaFieldKeys(ShowingFormDateTimeValuesSchema),
            component: (
                <ShowingSubmitFormDateTimeFieldset
                    activeFields={activeFields}
                    form={form}
                />
            ),
        },
        {
            title: "Status",
            stepCount: 4,
            icon: ChevronRight,
            fields: getSchemaFieldKeys(ShowingFormStatusValuesSchema),
            component: (
                <ShowingSubmitFormStatusFieldset
                    activeFields={activeFields}
                    form={form}
                />
            ),
        },
    ];

    // --- Mutation & Submit Handler ---
    const resetOnSuccess = (data: ShowingDetails) => {
        localStorage.removeItem(localStorageKey);
        form.reset();
        onSubmitSuccess?.(data);
    };

    const mutation = useShowingSubmitMutation({
        form,
        editID: showing?._id,
        ...onSubmitProps,
        onSubmitSuccess: resetOnSuccess,
    });

    /**
     * Submits validated form values to the mutation handler.
     */
    const onFormSubmit = (values: ShowingFormValues) => {
        buildFormSubmitLog({
            values,
            msg: "Showing Submit",
            component: ShowingSubmitFormContainer.name,
        });
        mutation.mutate(values as ShowingForm);
    };

    // --- Render ---
    return (
        <MultiStepForm
            localStorageKey={localStorageKey}
            form={form}
            submitHandler={onFormSubmit}
            steps={steps}
        />
    );
};

export default ShowingSubmitFormContainer;
