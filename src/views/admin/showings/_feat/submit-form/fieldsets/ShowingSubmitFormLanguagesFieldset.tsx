/**
 * @fileoverview Fieldset for selecting primary and subtitle languages in the showing submission form.
 */

import {ReactElement} from 'react';
import {Separator} from "@/common/components/ui/separator.tsx";
import {ShowingFormValues} from "@/domains/showings/_schema/form";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {cn} from "@/common/lib/utils.ts";
import {HookFormMultiSelect, HookFormSelect} from "@/views/common/_comp";
import {ISO6391LanguageOptions} from "@/common/_const";

/**
 * Form section for language configuration.
 */
export function ShowingSubmitFormLanguagesFieldset(
    {disableFields, className}: Omit<FormFieldsetProps<ShowingFormValues>, "isNestedView">
): ReactElement {
    return (
        <fieldset className={cn("space-y-3", className)}>
            <div>
                <h3 className="fieldset-header">Languages</h3>
                <Separator/>
            </div>

            {
                !disableFields?.language && (
                    <HookFormSelect
                        name="language"
                        label="Language"
                        description="The language in which the showing is available."
                        options={ISO6391LanguageOptions}
                    />
                )
            }

            {
                !disableFields?.subtitleLanguages && (
                    <HookFormMultiSelect
                        name="subtitleLanguages"
                        label="Subtitles"
                        description="Available subtitle languages."
                        options={ISO6391LanguageOptions}
                    />
                )
            }
        </fieldset>
    );
}
