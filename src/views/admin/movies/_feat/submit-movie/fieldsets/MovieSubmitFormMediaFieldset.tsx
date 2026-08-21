/**
 * @fileoverview Fieldset component for movie media and accessibility settings in the movie submission form.
 */

import {ReactElement} from "react";
import {Separator} from "@/views/common/_comp/ui/separator.tsx";
import {HookFormCheckbox, HookFormInput} from "@/views/common/_feat";
import {GenreMultiSelect} from "@/views/admin/genres";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {useFormContext} from "react-hook-form";
import {cn, createFormFieldConfig, renderFields, useBaseFormContext} from "@/common/_feat";
import {MovieFormStarterValues} from "@/domains/movies/_feat/submit-data";
import {HookFormMultiSelect} from "@/views/common/_comp";
import {ISO6391LanguageOptions} from "@/common/_const";
import {ConditionalRenderConfig} from "@/common/_types/form/HookFormFieldsetConfigTypes.ts";

/**
 * Renders form fields for trailer URLs, languages, subtitles, and availability.
 */
export function MovieSubmitFormMediaFieldset(
    {className, disableFields, hideFields}: FormFieldsetProps<MovieFormStarterValues>
): ReactElement {
    const {control} = useFormContext();
    const {isPending} = useBaseFormContext();

    const field = createFormFieldConfig({disableFields, hideFields, extraDisabled: isPending})
    const fields: ConditionalRenderConfig[] = [
        field({
            key: "trailerURL",
            element: <HookFormInput
                name="trailerURL"
                label="Trailer URL"
                control={control}
            />
        }),
        field({
            key: "languages",
            element: <HookFormMultiSelect
                name="languages"
                label="Available Languages"
                options={ISO6391LanguageOptions}
            />
        }),
        field({
            key: "subtitles",
            element: <HookFormMultiSelect
                name="subtitles"
                label="Subtitles"
                options={ISO6391LanguageOptions}
            />
        }),
        field({
            key: "genres",
            element:
                <GenreMultiSelect
                    name="genres"
                    label="Genres"
                />
        }),
        field({
            key: "isAvailable",
            element: <HookFormCheckbox
                    name="isAvailable"
                    label="Is Publicly Available?"
                />
        })
    ];

    return (
        <fieldset className={cn("space-y-3", className)}>
            <section>
                <h2 className="text-lg font-bold">Media & Accessibility</h2>
                <Separator/>
            </section>

            {renderFields({fields})}
        </fieldset>
    );
}