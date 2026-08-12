/**
 * @fileoverview Renders form sorting fields for ordering person index query results.
 */

import {cn} from "@/common/_feat";
import {ReactElement} from "react";
import {DisableFields, HideFields} from "@/common/_types";
import {HookFormSortToggle} from "@/views/common/_feat";
import {
    PersonIndexQueryOptionsFormValues
} from "@/domains/persons/_feat/validate-query-options/person-index/PersonIndexQueryOptionSchema.ts";

/** Props for the PersonIndexQueryOptionsFormSortFieldset component. */
type FieldsetProps = {
    className?: string;
    disableFields?: DisableFields<PersonIndexQueryOptionsFormValues>;
    hiddenFields?: HideFields<PersonIndexQueryOptionsFormValues>;
};

/**
 * Renders a set of form toggles for controlling the sort order of person index queries.
 */
export function PersonIndexQueryOptionsFormSortFieldset(
    {className, disableFields, hiddenFields}: FieldsetProps
): ReactElement {
    return (
        <fieldset className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", className)}>
            {!hiddenFields?.sortByName && (
                <HookFormSortToggle
                    name="sortByName"
                    label="Name"
                    disabled={disableFields?.sortByName}
                />
            )}

            {!hiddenFields?.sortByNationality && (
                <HookFormSortToggle
                    name="sortByNationality"
                    label="Nationality"
                    disabled={disableFields?.sortByNationality}
                />
            )}
        </fieldset>
    );
}