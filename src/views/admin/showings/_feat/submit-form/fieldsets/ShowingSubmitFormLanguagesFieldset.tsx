/**
 * @fileoverview Fieldset for selecting primary and subtitle languages in the showing submission form.
 */

import {ReactElement} from 'react';
import {Separator} from "@/views/common/_comp/ui/separator.tsx";
import {ShowingFormValues} from "@/domains/showings/_schema/form";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {cn, createFormFieldConfig, renderFields, useBaseMultiStepFormContext} from "@/common/_feat";
import {HookFormMultiSelect, HookFormSelect} from "@/views/common/_comp";
import {ISO6391LanguageOptions} from "@/common/_const";
import {ConditionalRenderConfig} from "@/common/_types/form/HookFormFieldsetConfigTypes.ts";

/**
 * Form section for language configuration.
 */
export function ShowingSubmitFormLanguagesFieldset(
    {disableFields, hideFields, className}: Omit<FormFieldsetProps<ShowingFormValues>, "isNestedView">
): ReactElement {
    const {isPending} = useBaseMultiStepFormContext();
    const field = createFormFieldConfig({disableFields, hideFields, extraDisabled: isPending});

    const fields: ConditionalRenderConfig[] = [
        field({
            key: "language",
            element: <HookFormSelect
                name="language"
                label="Language"
                description="The language in which the showing is available."
                options={ISO6391LanguageOptions}
            />,
        }),
        field({
            key: "subtitleLanguages",
            element: <HookFormMultiSelect
                name="subtitleLanguages"
                label="Subtitles"
                description="Available subtitle languages."
                options={ISO6391LanguageOptions}
            />,
        }),
    ];

    return (
        <fieldset className={cn("space-y-3", className)}>
            <div>
                <h3 className="fieldset-header">Languages</h3>
                <Separator/>
            </div>

            {renderFields({fields})}
        </fieldset>
    );
}
