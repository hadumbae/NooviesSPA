/**
 * @fileoverview Multi-step form view for creating or updating movie showings.
 */

import {ReactElement} from "react";
import {DisableFields} from "@/common/types";
import {ShowingFormValues} from "@/domains/showings/_schema/form/form-values/ShowingFormValues.ts";
import {FormStep, FormStepMeta} from "@/common/_feat/multi-step-form/types.ts";
import {ChevronRight, Clock, Languages, ListCollapse} from "lucide-react";
import getSchemaFieldKeys from "@/common/utility/features/zod/getSchemaFieldKeys.ts";
import {
    ShowingSubmitFormDetailsFieldset
} from "@/views/admin/showings/_feat/submit-form/fieldsets/ShowingSubmitFormDetailsFieldset.tsx";
import {
    ShowingFormDateTimeSchema,
    ShowingFormDetailSchema,
    ShowingFormLanguageSchema,
    ShowingFormStatusSchema
} from "@/domains/showings/_schema/form";
import {
    ShowingSubmitFormLanguagesFieldset
} from "@/views/admin/showings/_feat/submit-form/fieldsets/ShowingSubmitFormLanguagesFieldset.tsx";
import {
    ShowingSubmitFormDateTimeFieldset
} from "@/views/admin/showings/_feat/submit-form/fieldsets/ShowingSubmitFormDateTimeFieldset.tsx";
import {
    ShowingSubmitFormStatusFieldset
} from "@/views/admin/showings/_feat/submit-form/fieldsets/ShowingSubmitFormStatusFieldset.tsx";
import {MultiStepForm, MultiStepFormView} from "@/common/components/forms/multi-step-form";
import {MultiStepFormCurrentStep} from "@/common/components/forms/multi-step-form/form/MultiStepFormCurrentStep.tsx";

/** Props for the ShowingSubmitFormView component. */
type ViewProps = {
    disableFields?: DisableFields<ShowingFormValues>;
};

/**
 * Orchestrates the multi-step submission process for showings.
 */
export function ShowingSubmitFormView(
    {disableFields}: ViewProps
): ReactElement {
    const steps: FormStep<ShowingFormValues>[] = [
        {
            title: "Details",
            stepCount: 1,
            icon: ListCollapse,
            fields: getSchemaFieldKeys(ShowingFormDetailSchema),
            component: <ShowingSubmitFormDetailsFieldset disableFields={disableFields}/>,
        },
        {
            title: "Languages",
            stepCount: 2,
            icon: Languages,
            fields: getSchemaFieldKeys(ShowingFormLanguageSchema),
            component: <ShowingSubmitFormLanguagesFieldset disableFields={disableFields}/>,
        },
        {
            title: "Date & Time",
            stepCount: 3,
            icon: Clock,
            fields: getSchemaFieldKeys(ShowingFormDateTimeSchema),
            component: <ShowingSubmitFormDateTimeFieldset disableFields={disableFields}/>,
        },
        {
            title: "Status",
            stepCount: 4,
            icon: ChevronRight,
            fields: getSchemaFieldKeys(ShowingFormStatusSchema),
            component: <ShowingSubmitFormStatusFieldset disableFields={disableFields}/>,
        },
    ];

    const stepMeta = steps.map(({component, ...rest}): FormStepMeta<ShowingFormValues> => rest);

    return (
        <MultiStepForm stepMeta={stepMeta}>
            <MultiStepFormView>
                <MultiStepFormCurrentStep steps={steps}/>
            </MultiStepFormView>
        </MultiStepForm>
    );
}