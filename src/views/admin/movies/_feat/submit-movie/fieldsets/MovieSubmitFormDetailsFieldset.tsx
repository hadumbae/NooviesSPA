/**
 * @fileoverview Fieldset component for capturing basic movie details in a form.
 */

import {ReactElement} from "react";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {MovieFormStarterValues} from "@/domains/movies/_feat/submit-data";
import {Separator} from "@/common/components/ui/separator.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import {cn} from "@/common/lib/utils.ts";
import {useFormContext} from "react-hook-form";

/**
 * Renders form fields for basic movie information like title, tagline, and synopsis.
 */
export function MovieSubmitFormDetailsFieldset(
    {className, disableFields}: Omit<FormFieldsetProps<MovieFormStarterValues>, "isNestedView">
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className={cn("space-y-3", className)}>
            <section>
                <h2 className="text-lg font-bold">Basic Details</h2>
                <Separator/>
            </section>

            {
                !disableFields?.title &&
                <HookFormInput name="title" label="Title" control={control}/>
            }

            {
                !disableFields?.originalTitle &&
                <HookFormInput name="originalTitle" label="Original Title" control={control}/>
            }

            {
                !disableFields?.tagline &&
                <HookFormInput name="tagline" label="Tagline" control={control}/>
            }

            {
                !disableFields?.synopsis &&
                <HookFormTextArea name="synopsis" label="Synopsis" control={control}/>
            }
        </fieldset>
    );
}