/**
 * @fileoverview Fieldset component for movie media and accessibility settings in the movie submission form.
 */

import {ReactElement} from "react";
import {Separator} from "@/views/common/_comp/ui/separator.tsx";
import {HookFormCheckbox, HookFormInput} from "@/views/common/_feat";
import {GenreMultiSelect} from "@/views/admin/genres";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat";
import {MovieFormStarterValues} from "@/domains/movies/_feat/submit-data";
import {HookFormMultiSelect} from "@/views/common/_comp";
import {ISO6391LanguageOptions} from "@/common/_const";

/**
 * Renders form fields for trailer URLs, languages, subtitles, and availability.
 */
export function MovieSubmitFormMediaFieldset(
    {className, disableFields}: Omit<FormFieldsetProps<MovieFormStarterValues>, "isNestedView">
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className={cn("space-y-3", className)}>
            <section>
                <h2 className="text-lg font-bold">Media & Accessibility</h2>
                <Separator/>
            </section>

            {
                !disableFields?.trailerURL &&
                <HookFormInput name="trailerURL" label="Trailer URL" control={control}/>
            }

            {
                !disableFields?.languages &&
                <HookFormMultiSelect name="languages" label="Available Languages" options={ISO6391LanguageOptions}/>
            }

            {
                !disableFields?.subtitles &&
                <HookFormMultiSelect name="subtitles" label="Subtitles" options={ISO6391LanguageOptions}/>
            }

            {
                !disableFields?.genres &&
                <GenreMultiSelect name="genres" label="Genres"/>
            }

            {
                !disableFields?.isAvailable &&
                <HookFormCheckbox name="isAvailable" label="Is Publicly Available?"/>
            }
        </fieldset>
    );
}