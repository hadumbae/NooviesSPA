/**
 * @fileoverview Fieldset component for capturing basic movie details in a form.
 */

import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {MovieFormStarterValues} from "@/domains/movies";
import {cn} from "@/common/_feat";
import {Separator} from "@/views/common/_comp/ui";
import {HookFormInput, HookFormTextArea} from "@/views/common/_feat";

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
                <HookFormTextArea name="synopsis" label="Synopsis"/>
            }
        </fieldset>
    );
}