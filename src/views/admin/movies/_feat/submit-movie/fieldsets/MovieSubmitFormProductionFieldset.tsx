/**
 * @fileoverview Fieldset component for movie production and release metadata.
 */

import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {MovieFormStarterValues} from "@/domains/movies";
import {Separator} from "@/views/common/_comp/ui";
import {cn, createFormFieldConfig, renderFields, useBaseFormContext} from "@/common/_feat";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {HookFormCheckbox, HookFormInput} from "@/views/common/_feat";
import {HookFormMultiSelect, HookFormSelect} from "@/views/common/_comp";
import {ISO3166Alpha2CountryOptions, ISO6391LanguageOptions} from "@/common/_const";
import {ConditionalRenderConfig} from "@/common/_types/form/HookFormFieldsetConfigTypes.ts";

/**
 * Renders form fields for country, runtime, language, and release status.
 */
export function MovieSubmitFormProductionFieldset(
    {className, disableFields, hideFields}: FormFieldsetProps<MovieFormStarterValues>
): ReactElement {
    const {control} = useFormContext();
    const {isPending} = useBaseFormContext();

    const field = createFormFieldConfig({disableFields, hideFields, extraDisabled: isPending})
    const fields: ConditionalRenderConfig[] = [
        field({
            key: "country",
            element: <HookFormSelect name="country" label="Country" options={ISO3166Alpha2CountryOptions}/>
        }),
        field({
            key: "runtime",
            element: <HookFormInput name="runtime" label="Duration (Min)" control={control} type="number"/>
        }),
        field({
            key: "originalLanguage",
            element: <HookFormMultiSelect
                name="originalLanguage"
                label="Original Language"
                options={ISO6391LanguageOptions}
            />
        }),
        field({
            key: "isReleased",
            element: <HookFormCheckbox name="isReleased" label="Is Released?"/>
        }),
        field({
            key: "releaseDate",
            element: <HookFormInput name="releaseDate" label="Release Date" control={control} type="date"/>
        }),
    ];

    return (
        <fieldset className={cn("space-y-3", className)}>
            <section>
                <h2 className="text-lg font-bold">Production & Release</h2>
                <Separator/>
            </section>

            {renderFields({fields})}
        </fieldset>
    );
}