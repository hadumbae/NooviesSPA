/**
 * @fileoverview Fieldset for selecting primary and subtitle languages in the showing submission form.
 */

import {ReactElement} from 'react';
import {
    LanguageHookFormSelect
} from "@/common/components/forms/values/LanguageHookFormSelect.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {ShowingFormValues} from "@/domains/showings/_schema/form";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";

/**
 * Form section for language configuration.
 */
export function ShowingSubmitFormLanguagesFieldset(
    {disableFields, className}: Omit<FormFieldsetProps<ShowingFormValues>, "isNestedView">
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className={cn("space-y-3", className)}>
            <div>
                <PrimaryHeaderText>Languages</PrimaryHeaderText>
                <Separator/>
            </div>

            {
                !disableFields?.language && (
                    <LanguageHookFormSelect
                        name="language"
                        label="Language"
                        control={control}
                        isMulti={false}
                        description="The language in which the showing is available."
                    />
                )
            }

            {
                !disableFields?.subtitleLanguages && (
                    <LanguageHookFormSelect
                        name="subtitleLanguages"
                        label="Subtitles"
                        control={control}
                        isMulti={true}
                        description="Available subtitle languages."
                    />
                )
            }
        </fieldset>
    );
}
