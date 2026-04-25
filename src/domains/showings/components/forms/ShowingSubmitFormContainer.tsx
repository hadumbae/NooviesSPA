/**
 * @fileoverview Container component for creating or editing movie showings.
 * Manages multi-step form state, persistence, and server mutations.
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
import {ShowingSubmitFormDetailsFieldset}
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
 * Union type for editing vs. creation mode props.
 */
type ShowingEditingProps =
    | { entity: Showing; theatreTimezone: IANATimezone }
    | { entity?: never; theatreTimezone?: never };

/**
 * Combined props for the ShowingSubmitFormContainer.
 */
type SubmitContainerProps =
    MutationOnSubmitParams<ShowingDetails>
    & FormOptions<ShowingFormValues>
    & ShowingEditingProps
    & { className?: string };

/**
 * Orchestrates the multi-step lifecycle for showing submissions.
 * Includes local storage persistence and logic for dynamic field toggling.
 */
const ShowingSubmitFormContainer: FC<SubmitContainerProps> = (props) => {
    const {entity: showing, theatreTimezone, disableFields, presetValues, ...onSubmitProps} = props;
    const {onSubmitSuccess} = onSubmitProps;

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

    const steps: FormStep<ShowingFormValues>[] = [
        {
            title: "Details",
            stepCount: 1,
            icon: ListCollapse,
            fields: getSchemaFieldKeys(ShowingFormDetailValuesSchema),
            component: <ShowingSubmitFormDetailsFieldset activeFields={activeFields} form={form} />,
        },
        {
            title: "Languages",
            stepCount: 2,
            icon: Languages,
            fields: getSchemaFieldKeys(ShowingFormLanguageValuesSchema),
            component: <ShowingSubmitFormLanguagesFieldset activeFields={activeFields} form={form} />,
        },
        {
            title: "Date & Time",
            stepCount: 3,
            icon: Clock,
            fields: getSchemaFieldKeys(ShowingFormDateTimeValuesSchema),
            component: <ShowingSubmitFormDateTimeFieldset activeFields={activeFields} form={form} />,
        },
        {
            title: "Status",
            stepCount: 4,
            icon: ChevronRight,
            fields: getSchemaFieldKeys(ShowingFormStatusValuesSchema),
            component: <ShowingSubmitFormStatusFieldset activeFields={activeFields} form={form} />,
        },
    ];

    /**
     * Cleans up persistence and resets form state on successful submission.
     */
    const resetOnSuccess = (data: ShowingDetails) => {
        localStorage.removeItem(localStorageKey);
        if (initialValues.current) form.reset(initialValues.current);
        onSubmitSuccess?.(data);
    };

    const mutation = useShowingSubmitMutation({
        form,
        editID: showing?._id,
        ...onSubmitProps,
        onSubmitSuccess: resetOnSuccess,
    });

    /**
     * Final submission handler.
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