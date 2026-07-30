/**
 * @fileoverview Form view for managing customer search, filtering, and sorting options.
 */

import {ReactElement} from "react";
import {QueryOptionFormViewProps} from "@/common/_feat";
import {CustomerIndexQueryOptionFormValues} from "@/domains/customers/_types";
import {
    CustomerIndexQueryOptionFormFilterFieldset
} from "@/views/admin/customers/_feat/query-option-forms/customer-index/CustomerIndexQueryOptionFormFilterFieldset.tsx";
import {
    CustomerIndexQueryOptionFormSortFieldset
} from "@/views/admin/customers/_feat/query-option-forms/customer-index/CustomerIndexQueryOptionFormSortFieldset.tsx";
import {QueryOptionFormLayout} from "@/views/common/_feat";

/**
 * Form component for customer index query options that automatically submits on change.
 */
export function CustomerIndexQueryOptionFormView(
    {disableFields, classNames}: QueryOptionFormViewProps<CustomerIndexQueryOptionFormValues>
): ReactElement {
    return (
        <QueryOptionFormLayout
            filterFieldset={CustomerIndexQueryOptionFormFilterFieldset}
            sortFieldset={CustomerIndexQueryOptionFormSortFieldset}
            disableFields={disableFields}
            classNames={classNames}
        />
    );
}