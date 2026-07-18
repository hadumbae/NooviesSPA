/**
 * @fileoverview Fieldset component for movie production and release metadata.
 */

import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {MovieFormStarterValues} from "@/domains/movies";
import {Separator} from "@/common/components/ui";
import {cn} from "@/common/_feat";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {HookFormCheckbox, HookFormInput} from "@/views/common/_feat";
import {HookFormMultiSelect, HookFormSelect} from "@/views/common/_comp";
import {ISO3166Alpha2CountryOptions, ISO6391LanguageOptions} from "@/common/_const";

/**
 * Renders form fields for country, runtime, language, and release status.
 */
export function MovieSubmitFormProductionFieldset(
    {className, disableFields}: Omit<FormFieldsetProps<MovieFormStarterValues>, "isNestedView">
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className={cn("space-y-3", className)}>
            <section>
                <h2 className="text-lg font-bold">Production & Release</h2>
                <Separator/>
            </section>

            {
                !disableFields?.country &&
                <HookFormSelect name="country" label="Country" options={ISO3166Alpha2CountryOptions}/>
            }

            {
                !disableFields?.runtime &&
                <HookFormInput name="runtime" label="Duration (Min)" control={control} type="number"/>
            }

            {
                !disableFields?.originalLanguage &&
                <HookFormMultiSelect
                    name="originalLanguage"
                    label="Original Language"
                    options={ISO6391LanguageOptions}
                />
            }

            {
                !disableFields?.isReleased &&
                <HookFormCheckbox name="isReleased" label="Is Released?"/>
            }

            {
                !disableFields?.releaseDate &&
                <HookFormInput name="releaseDate" label="Release Date" control={control} type="date"/>
            }
        </fieldset>
    );
}