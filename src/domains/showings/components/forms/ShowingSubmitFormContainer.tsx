/**
 * @fileoverview Container component for the showing submission multi-step form.
 */

import {ReactElement} from "react";
import useShowingSubmitForm from "@/domains/showings/hooks/forms/useShowingSubmitForm.ts";
import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {IANATimezone} from "@/common/schema/date-time/IANATimezone.schema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {FormStep} from "@/common/type/form/SteppedFormTypes.ts";
import {ChevronRight, Clock, Languages, ListCollapse} from "lucide-react";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {
    ShowingSubmitFormDetailsFieldset
} from "@/domains/showings/components/forms/fieldsets/ShowingSubmitFormDetailsFieldset.tsx";
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
import {ShowingFormValues} from "@/domains/showings/schema/form/form-values/ShowingFormValues.ts";
import {ShowingFormValuesSchema} from "@/domains/showings/schema/form/form-values/ShowingFormValuesSchema.ts";
import {
    ShowingFormData,
    ShowingFormDateTimeSchema,
    ShowingFormDetailSchema,
    ShowingFormLanguageSchema, ShowingFormStatusSchema
} from "@/domains/showings/schema/form";
import {useShowingSubmitMutation} from "@/domains/showings/_feat/crud-hooks";

/** Type definition for showing editing state props. */
type ShowingEditingProps =
    | { entity: Showing; theatreTimezone: IANATimezone }
    | { entity?: never; theatreTimezone?: never };

/** Props for the ShowingSubmitFormContainer component. */
type SubmitContainerProps =
    MutationOnSubmitParams<ShowingDetails>
    & FormOptions<ShowingFormValues>
    & ShowingEditingProps
    & { className?: string };

/**
 * Orchestrates the multi-step form for creating or updating movie showings.
 * Manages form state, validation schemas, and submission mutations.
 */
export function ShowingSubmitFormContainer(props: SubmitContainerProps): ReactElement {
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
            fields: getSchemaFieldKeys(ShowingFormDetailSchema),
            component: <ShowingSubmitFormDetailsFieldset activeFields={activeFields} form={form}/>,
        },
        {
            title: "Languages",
            stepCount: 2,
            icon: Languages,
            fields: getSchemaFieldKeys(ShowingFormLanguageSchema),
            component: <ShowingSubmitFormLanguagesFieldset activeFields={activeFields} form={form}/>,
        },
        {
            title: "Date & Time",
            stepCount: 3,
            icon: Clock,
            fields: getSchemaFieldKeys(ShowingFormDateTimeSchema),
            component: <ShowingSubmitFormDateTimeFieldset activeFields={activeFields} form={form}/>,
        },
        {
            title: "Status",
            stepCount: 4,
            icon: ChevronRight,
            fields: getSchemaFieldKeys(ShowingFormStatusSchema),
            component: <ShowingSubmitFormStatusFieldset activeFields={activeFields} form={form}/>,
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

        mutation.mutate(values as ShowingFormData);
    };

    return (
        <MultiStepForm
            localStorageKey={localStorageKey}
            form={form}
            submitHandler={onFormSubmit}
            steps={steps}
        />
    );
}
