/**
 * @fileoverview Renders the form view layout for person index query options.
 */

import {ReactElement} from "react";
import {QueryOptionFormLayout} from "@/views/common/_feat";
import {
    PersonIndexQueryOptionsFormFilterFieldset
} from "@/views/admin/persons/_feat/query-option-form/person-index/PersonIndexQueryOptionsFormFilterFieldset.tsx";
import {
    PersonIndexQueryOptionsFormSortFieldset
} from "@/views/admin/persons/_feat/query-option-form/person-index/PersonIndexQueryOptionsFormSortFieldset.tsx";
import {QueryOptionFormViewProps} from "@/common/_feat";
import {CustomerIndexQueryOptionFormValues} from "@/domains/customers";

/**
 * Renders the filter and sort fieldsets for person index query options using the query option form layout.
 */
export function PersonIndexQueryOptionsFormView(
    {disableFields, classNames}: QueryOptionFormViewProps<CustomerIndexQueryOptionFormValues>
): ReactElement {
    return (
        <QueryOptionFormLayout
            filterFieldset={PersonIndexQueryOptionsFormFilterFieldset}
            sortFieldset={PersonIndexQueryOptionsFormSortFieldset}
            disableFields={disableFields}
            classNames={classNames}
        />
    );
}