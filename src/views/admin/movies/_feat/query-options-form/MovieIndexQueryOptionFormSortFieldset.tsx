/**
 * @fileoverview Fieldset component for rendering movie index query sort options.
 */

import {ReactElement} from "react";
import {cn, createFormFieldConfig, renderFields} from "@/common/_feat";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {HookFormSortToggle} from "@/views/common/_feat";
import {MovieQueryOptionFormValues} from "@/domains/movies";
import {ConditionalRenderConfig} from "@/common/_types/form/HookFormFieldsetConfigTypes.ts";

/** Renders the form fields for sorting movie index query options. */
export function MovieIndexQueryOptionFormSortFieldset(
    {disableFields, hideFields, className}: FormFieldsetProps<MovieQueryOptionFormValues>
): ReactElement {
    const field = createFormFieldConfig({disableFields, hideFields});

    const fields: ConditionalRenderConfig[] = [
        field({
            key: "sortByTitle",
            element: <HookFormSortToggle name="sortByTitle" label="Title"/>
        }),
        field({
            key: "sortByReleaseDate",
            element: <HookFormSortToggle name="sortByReleaseDate" label="Release Date"/>
        }),
        field({
            key: "sortByCountry",
            element: <HookFormSortToggle name="sortByCountry" label="Country"/>
        }),
        field({
            key: "sortByIsReleased",
            element: <HookFormSortToggle name="sortByIsReleased" label="Is Released?"/>
        }),
        field({
            key: "sortByIsAvailable",
            element: <HookFormSortToggle name="sortByIsAvailable" label="Is Available?"/>
        }),
    ];

    return (
        <fieldset className={cn("flex flex-wrap", className)}>
            {renderFields({fields})}
        </fieldset>
    );
}