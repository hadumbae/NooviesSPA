/**
 * @fileoverview Fieldset component for rendering genre index query option sorting inputs.
 */

import {ReactElement} from "react";
import {createFormFieldConfig, FormViewProps, renderFields} from "@/common/_feat";
import {GenreIndexQueryOptionsFormValues} from "@/domains/genres";
import {ConditionalRenderConfig} from "@/common/_types/form/HookFormFieldsetConfigTypes.ts";
import {HookFormSortToggle} from "@/views/common/_feat";

/** Renders form fields for sorting genre query results. Requires wrapping in a React Hook Form context. */
export function GenreIndexQueryOptionsFormSortFieldset(
    {className, hideFields, disableFields}: FormViewProps<GenreIndexQueryOptionsFormValues>
): ReactElement {
    const field = createFormFieldConfig({hideFields, disableFields});

    const fields: ConditionalRenderConfig[] = [
        field({
            key: "name",
            element: <HookFormSortToggle label="Sort By Name" name="sortByName"/>
        }),
    ];

    return (
        <fieldset className={className}>
            {renderFields({fields})}
        </fieldset>
    );
}