/**
 * @fileoverview Fieldset component for rendering genre index query option filter inputs.
 */

import {ReactElement} from "react";
import {createFormFieldConfig, FormViewProps, renderFields} from "@/common/_feat";
import {GenreIndexQueryOptionsFormValues} from "@/domains/genres";
import {ConditionalRenderConfig} from "@/common/_types/form/HookFormFieldsetConfigTypes.ts";
import {HookFormInput} from "@/views/common/_feat";
import {useFormContext} from "react-hook-form";
import {LabelledFormInput} from "@/views/admin/movies";

/** Renders form fields for filtering genres by search criteria. Requires wrapping in a React Hook Form context. */
export function GenreIndexQueryOptionsFormFilterFieldset(
    {className, hideFields, disableFields}: FormViewProps<GenreIndexQueryOptionsFormValues>
): ReactElement {
    const {control} = useFormContext();
    const field = createFormFieldConfig({hideFields, disableFields});

    const fields: ConditionalRenderConfig[] = [
        field({
            key: "name",
            element: <LabelledFormInput label="Name">
                <HookFormInput name="name" control={control}/>
            </LabelledFormInput>
        }),
    ];

    return (
        <fieldset className={className}>
            {renderFields({fields})}
        </fieldset>
    );
}