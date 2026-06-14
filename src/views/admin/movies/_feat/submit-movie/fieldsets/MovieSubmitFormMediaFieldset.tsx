/**
 * @fileoverview Fieldset component for movie media and accessibility settings in the movie submission form.
 */

import {ReactElement} from "react";
import {Separator} from "@/common/components/ui/separator.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {LanguageHookFormSelect} from "@/common/components/forms/values/LanguageHookFormSelect.tsx";
import {GenreMultiSelect} from "@/views/admin/genres";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import {MovieFormStarterValues} from "@/domains/movies/_feat/submit-data";

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
                <HookFormInput
                    name="trailerURL"
                    label="Trailer URL"
                    control={control}
                />
            }

            {
                !disableFields?.languages &&
                <LanguageHookFormSelect
                    name="languages"
                    label="Available Languages"
                    control={control}
                    isMulti
                />
            }

            {
                !disableFields?.subtitles &&
                <LanguageHookFormSelect
                    name="subtitles"
                    label="Subtitles"
                    control={control}
                    isMulti
                />
            }

            {
                !disableFields?.genres &&
                <GenreMultiSelect name="genres" label="Genres"/>
            }

            {
                !disableFields?.isAvailable &&
                <HookFormCheckbox
                    name="isAvailable"
                    label="Is Publicly Available?"
                    control={control}
                />
            }
        </fieldset>
    );
}