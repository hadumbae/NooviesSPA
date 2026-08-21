/**
 * @fileoverview Fieldset component for capturing basic movie details in a form.
 */

import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {MovieFormStarterValues} from "@/domains/movies";
import {cn, createFormFieldConfig, renderFields, useBaseFormContext} from "@/common/_feat";
import {Separator} from "@/views/common/_comp/ui";
import {HookFormInput, HookFormTextArea} from "@/views/common/_feat";
import {ConditionalRenderConfig} from "@/common/_types/form/HookFormFieldsetConfigTypes.ts";

/**
 * Renders form fields for basic movie information like title, tagline, and synopsis.
 */
export function MovieSubmitFormDetailsFieldset(
    {className, disableFields, hideFields}: FormFieldsetProps<MovieFormStarterValues>
): ReactElement {
    const {control} = useFormContext();
    const {isPending} = useBaseFormContext();

    const field = createFormFieldConfig({disableFields, hideFields, extraDisabled: isPending});

    const fields: ConditionalRenderConfig[] = [
        field({
            key: "title",
            element: <HookFormInput name="title" label="Title" control={control}/>,
        }),
        field({
            key: "originalTitle",
            element: <HookFormInput name="originalTitle" label="Original Title" control={control}/>,
        }),
        field({
            key: "tagline",
            element: <HookFormInput name="tagline" label="Tagline" control={control}/>,
        }),
        field({
            key: "synopsis",
            element: <HookFormTextArea name="synopsis" label="Synopsis"/>,
        }),
    ];

    return (
        <fieldset className={cn("space-y-3", className)}>
            <section>
                <h2 className="text-lg font-bold">Basic Details</h2>
                <Separator/>
            </section>

            {renderFields({fields})}
        </fieldset>
    );
}