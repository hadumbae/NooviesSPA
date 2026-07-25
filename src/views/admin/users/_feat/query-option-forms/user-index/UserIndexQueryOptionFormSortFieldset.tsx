/**
 * @fileoverview Fieldset containing sort toggle controls for the user index query options form.
 */

import {ReactElement} from "react";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {UserIndexQueryOptionFormValues} from "@/domains/users/_feat/submit-query-options";
import {HookFormSortToggle} from "@/views/common/_feat";
import {cn} from "@/common/_feat";

/** Props for the UserIndexQueryOptionFormSortFieldset component. */
type FieldsetProps = Omit<FormFieldsetProps<UserIndexQueryOptionFormValues>, "isNestedView">;

/**
 * Renders a group of sort toggles for user-related fields like name, email, and unique code.
 */
export function UserIndexQueryOptionFormSortFieldset(
    {className, disableFields}: FieldsetProps
): ReactElement {
    return (
        <fieldset className={cn("flex flex-wrap space-x-2", className)}>
            {!disableFields?.sortByName && (
                <HookFormSortToggle name="sortByName" label="Name"/>
            )}

            {!disableFields?.sortByEmail && (
                <HookFormSortToggle name="sortByEmail" label="Email"/>
            )}

            {!disableFields?.sortByUniqueCode && (
                <HookFormSortToggle name="sortByUniqueCode" label="Unique Code"/>
            )}
        </fieldset>
    );
}