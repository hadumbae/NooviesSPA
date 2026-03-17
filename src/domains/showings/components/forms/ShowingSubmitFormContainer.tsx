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

import useShowingSubmitForm from "@/domains/showings/hooks/forms/useShowingSubmitForm.ts";
import useShowingSubmitMutation from "@/domains/showings/hooks/mutations/useShowingSubmitMutation.ts";

import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {IANATimezone} from "@/common/schema/date-time/IANATimezone.schema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {FormStep} from "@/common/type/form/SteppedFormTypes.ts";
import {ChevronRight, Clock, Languages, ListCollapse} from "lucide-react";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import ShowingSubmitFormDetailsFieldset
    from "@/domains/showings/components/forms/fieldsets/ShowingSubmitFormDetailsFieldset.tsx";
import ShowingSubmitFormLanguagesFieldset
    from "@/domains/showings/components/forms/fieldsets/ShowingSubmitFormLanguagesFieldset.tsx";
import MultiStepForm from "@/common/components/forms/multi-step-form/MultiStepForm.tsx";
import ShowingSubmitFormDateTimeFieldset
    from "@/domains/showings/components/forms/fieldsets/ShowingSubmitFormDateTimeFieldset.tsx";
import ShowingSubmitFormStatusFieldset
    from "@/domains/showings/components/forms/fieldsets/ShowingSubmitFormStatusFieldset.tsx";
import getSchemaFieldKeys from "@/common/utility/features/zod/getSchemaFieldKeys.ts";
import buildFormSubmitLog from "@/common/utility/features/logger/buildFormSubmitLog.ts";
import useFormInitialValues from "@/common/hooks/forms/useFormInitialValues.tsx";
import {Showing} from "@/domains/showings/schema/showing/ShowingSchema.ts";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {ShowingForm} from "@/domains/showings/schema/form/form-schemas/ShowingFormSchema.ts";
import {
    ShowingFormLanguageValuesSchema
} from "@/domains/showings/schema/form/form-values-schemas/ShowingFormLanguageValuesSchema.ts";
import {
    ShowingFormDateTimeValuesSchema
} from "@/domains/showings/schema/form/form-values-schemas/ShowingFormDateTimeValuesSchema.ts";
import {
    ShowingFormDetailValuesSchema
} from "@/domains/showings/schema/form/form-values-schemas/ShowingFormDetailValuesSchema.ts";
import {
    ShowingFormStatusValuesSchema
} from "@/domains/showings/schema/form/form-values-schemas/ShowingFormStatusValuesSchema.ts";
import {
    ShowingFormValues,
    ShowingFormValuesSchema
} from "@/domains/showings/schema/form/form-values-schemas/ShowingFormValuesSchema.ts";

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

    const initialValues = useFormInitialValues({form});

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
        initialValues.current && form.reset(initialValues.current);
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
