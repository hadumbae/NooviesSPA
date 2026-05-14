/**
 * @fileoverview Fieldset component for movie production and release metadata.
 */

import {ReactElement} from "react";
import {FormFieldsetProps} from "@/common/features/submit-data/formTypes.ts";
import {MovieFormStarterValues} from "@/domains/movies/_feat/submit-data";
import {Separator} from "@/common/components/ui/separator.tsx";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import LanguageHookFormSelect from "@/common/components/forms/values/LanguageHookFormSelect.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";
import {cn} from "@/common/lib/utils.ts";
import {useFormContext} from "react-hook-form";

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
                <CountryHookFormSelect
                    name="country"
                    label="Country"
                    control={control}
                />
            }

            {
                !disableFields?.runtime &&
                <HookFormInput
                    name="runtime"
                    label="Duration (Min)"
                    control={control}
                    type="number"
                />
            }

            {
                !disableFields?.originalLanguage &&
                <LanguageHookFormSelect
                    name="originalLanguage"
                    label="Original Language"
                    control={control}
                />
            }

            {
                !disableFields?.isReleased &&
                <HookFormCheckbox
                    name="isReleased"
                    label="Is Released?"
                    control={control}
                />
            }

            {
                !disableFields?.releaseDate &&
                <HookFormInput
                    name="releaseDate"
                    label="Release Date"
                    control={control}
                    type="date"
                />
            }
        </fieldset>
    );
}