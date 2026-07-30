/**
 * @fileoverview Fieldset component for managing sort options in the customer index query form.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";
import {HookFormSortToggle} from "@/views/common/_feat";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {CustomerIndexQueryOptionFormValues} from "@/domains/customers/_types";

/**
 * A fieldset containing sort toggles for customer name, email, and unique code.
 */
export function CustomerIndexQueryOptionFormSortFieldset(
    {className, disableFields}: FormFieldsetProps<CustomerIndexQueryOptionFormValues>
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