/**
 * @fileoverview Fieldset component for managing movie sorting options within a form.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {HookFormSortToggle} from "@/views/common/_feat";
import {MovieQueryOptionFormValues} from "@/domains/movies";
import {PageSectionHeader} from "@/views/common/_comp";

/** Props for the MovieQueryOptionFormSortFieldset component. */
type FieldsetProps = Omit<FormFieldsetProps<MovieQueryOptionFormValues>, "isNestedView">;

/**
 * Renders a collection of sort toggles for movie query fields.
 */
export function MovieQueryOptionFormSortFieldset(
    {disableFields, className}: FieldsetProps
): ReactElement {
    return (
        <fieldset className="space-y-4">
            <PageSectionHeader as="h3" text="Sorts" className="text-base"/>

            <div className={cn("flex flex-wrap", className)}>
                {!disableFields?.sortByReleaseDate && (
                    <HookFormSortToggle name="sortByReleaseDate" label="Release Date"/>
                )}

                {!disableFields?.sortByTitle && (
                    <HookFormSortToggle name="sortByTitle" label="Title"/>
                )}

                {!disableFields?.sortByOriginalTitle && (
                    <HookFormSortToggle name="sortByOriginalTitle" label="Original Title"/>
                )}

                {!disableFields?.sortByIsReleased && (
                    <HookFormSortToggle name="sortByIsReleased" label="Is Released?"/>
                )}

                {!disableFields?.sortByIsAvailable && (
                    <HookFormSortToggle name="sortByIsAvailable" label="Is Available?"/>
                )}

                {!disableFields?.sortByCountry && (
                    <HookFormSortToggle name="sortByCountry" label="Country"/>
                )}
            </div>
        </fieldset>
    );
}
