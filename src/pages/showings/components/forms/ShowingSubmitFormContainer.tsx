/**
 * @file ShowingSubmitFormContainer.tsx
 * @description
 * Container component managing the creation or editing of a `Showing`.
 *
 * Responsibilities:
 * - Initializes and manages form state via `useShowingSubmitForm`
 * - Sets up mutation logic with `useShowingSubmitMutation`
 * - Handles multi-step form steps and active fields
 * - Persists form state to `localStorage` and resets on successful submission
 * - Provides a clean API for UI components via `MultiStepForm`
 *
 * Form Steps:
 * 1. Details
 * 2. Languages
 * 3. Date & Time
 * 4. Status
 *
 * @example
 * ```tsx
 * <ShowingSubmitFormContainer
 *     isEditing={true}
 *     entity={existingShowing}
 *     theatreTimezone="Asia/Bangkok"
 *     presetValues={{ title: "Sample Showing" }}
 *     onSubmitSuccess={(showing) => console.log("Submitted", showing)}
 * />
 * ```
 */

import { FC } from "react";

import useShowingSubmitForm from "@/pages/showings/hooks/forms/useShowingSubmitForm.ts";
import useShowingSubmitMutation from "@/pages/showings/hooks/mutations/useShowingSubmitMutation.ts";

import { Showing } from "@/pages/showings/schema/showing/Showing.types.ts";
import { FormOptions } from "@/common/type/form/HookFormProps.ts";
import { IANATimezone } from "@/common/schema/date-time/IANATimezone.schema.ts";
import { MutationEditByIDParams, MutationOnSubmitParams } from "@/common/type/form/MutationSubmitParams.ts";
import { ShowingFormValues } from "@/pages/showings/schema/form/ShowingFormValues.types.ts";
import { FormStep } from "@/common/type/form/SteppedFormTypes.ts";
import { ChevronRight, Clock, Languages, ListCollapse } from "lucide-react";
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
import { ShowingForm } from "@/pages/showings/schema/form/ShowingForm.types.ts";
import buildFormSubmitLog from "@/common/utility/features/logger/buildFormSubmitLog.ts";

/**
 * Props used when the form is in editing mode.
 *
 * @property isEditing - Whether the form is editing an existing `Showing` entity.
 * @property entity - The `Showing` entity currently being edited.
 * @property theatreTimezone - The theatre's IANA timezone, used for showing date/time calculations.
 */
type ShowingEditingProps =
    | { isEditing: true; entity: Showing; theatreTimezone: IANATimezone }
    | { isEditing?: false; entity?: never; theatreTimezone?: never };

/**
 * Props for the `ShowingSubmitFormContainer` component.
 *
 * Combines mutation callbacks, form options, and optional editing parameters.
 *
 * @template Showing - The entity type being submitted or updated.
 *
 * @property className - Optional CSS class for styling.
 * @property disableFields - Optional list of form field names to disable.
 * @property presetValues - Optional preset form values (default initialization).
 * @property onSubmitSuccess - Callback fired after successful submission.
 * @property onSubmitError - Callback fired after failed submission.
 * @property isEditing - Whether the form is in edit mode (affects prefilled values and mutation behavior).
 * @property entity - The `Showing` being edited, if applicable.
 * @property theatreTimezone - The timezone context for showing date/time fields.
 */
type SubmitContainerProps =
    MutationOnSubmitParams<Showing> &
    FormOptions<ShowingFormValues> &
    ShowingEditingProps & {
    className?: string;
};

/**
 * Container component managing the logic for creating or editing a `Showing`.
 *
 * Features:
 * - Initializes multi-step form state and manages active fields
 * - Handles mutation logic for creating or updating showings
 * - Persists values in `localStorage` for step-by-step progress
 * - Resets form and clears `localStorage` after successful submission
 *
 * @template Showing - The type of entity being submitted or edited.
 *
 * @example
 * ```tsx
 * <ShowingSubmitFormContainer
 *     isEditing={true}
 *     entity={existingShowing}
 *     theatreTimezone="Asia/Bangkok"
 *     presetValues={{ title: "Sample Showing" }}
 *     onSubmitSuccess={(showing) => console.log("Submitted", showing)}
 * />
 * ```
 */
const ShowingSubmitFormContainer: FC<SubmitContainerProps> = (props) => {
    const { isEditing, entity, theatreTimezone, disableFields, presetValues, ...onSubmitProps } = props;
    const { onSubmitSuccess } = onSubmitProps;

    // ⚡ Form ⚡
    const formEditingProps = isEditing ? { showing: entity, theatreTimezone } : {};
    const form = useShowingSubmitForm({ presetValues, ...formEditingProps });

    // ⚡ Local Storage Key ⚡
    const localStorageKey = "showing-submit-form";

    // ⚡ Mutation Handlers ⚡
    const resetOnSuccess = (showing: Showing) => {
        localStorage.removeItem(localStorageKey);
        form.reset();
        onSubmitSuccess?.(showing);
    };

    const mutationProps: MutationEditByIDParams = isEditing
        ? { isEditing: true, _id: entity._id }
        : { isEditing: false };

    const mutation = useShowingSubmitMutation({
        form,
        ...mutationProps,
        ...onSubmitProps,
        onSubmitSuccess: resetOnSuccess,
    });

    // ⚡ Active Fields ⚡
    const activeFields = getActiveSchemaInputFields({
        schema: ShowingFormValuesSchema,
        disableFields,
    });

    // ⚡ Form Steps ⚡
    const steps: FormStep<ShowingFormValues>[] = [
        {
            title: "Details",
            stepCount: 1,
            icon: ListCollapse,
            component: <ShowingSubmitFormDetailsFieldset form={form} activeFields={activeFields} />,
            fields: getSchemaFieldKeys(ShowingFormDetailValuesSchema),
        },
        {
            title: "Languages",
            stepCount: 2,
            icon: Languages,
            component: <ShowingSubmitFormLanguagesFieldset form={form} activeFields={activeFields} />,
            fields: getSchemaFieldKeys(ShowingFormLanguageValuesSchema),
        },
        {
            title: "Date & Time",
            stepCount: 3,
            icon: Clock,
            component: <ShowingSubmitFormDateTimeFieldset form={form} activeFields={activeFields} />,
            fields: getSchemaFieldKeys(ShowingFormDateTimeValuesSchema),
        },
        {
            title: "Status",
            stepCount: 4,
            icon: ChevronRight,
            component: <ShowingSubmitFormStatusFieldset form={form} activeFields={activeFields} />,
            fields: getSchemaFieldKeys(ShowingFormStatusValuesSchema),
        },
    ];

    /**
     * Handles submission of the form by invoking the mutation with validated values.
     *
     * @param values - Validated `ShowingFormValues` to submit.
     */
    const onFormSubmit = (values: ShowingFormValues) => {
        buildFormSubmitLog({
            values,
            msg: "Showing Submit",
            component: ShowingSubmitFormContainer.name,
        });
        mutation.mutate(values as ShowingForm);
    };

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
