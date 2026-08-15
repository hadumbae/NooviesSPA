/**
 * @fileoverview Form view component for configuring theatre index query options.
 */

import {ReactElement} from "react";
import {QueryOptionFormViewProps} from "@/common/_feat";
import {TheatreIndexQueryOptionsFormValues} from "@/domains/theatres";
import {QueryOptionFormLayout} from "@/views/common/_feat";
import {
    TheatreIndexQueryOptionsFormFilterFieldset
} from "@/views/admin/theatres/_feat/submit-query-options/TheatreIndexQueryOptionsFormFilterFieldset.tsx";
import {
    TheatreIndexQueryOptionsFormSortFieldset
} from "@/views/admin/theatres/_feat/submit-query-options/TheatreIndexQueryOptionsFormSortFieldset.tsx";

/**
 * Renders the layout view for theatre index filter and sort form fieldsets.
 */
export function TheatreIndexQueryOptionsFormView(
    {classNames, disableFields}: QueryOptionFormViewProps<TheatreIndexQueryOptionsFormValues>
): ReactElement {
    return (
        <QueryOptionFormLayout
            filterFieldset={TheatreIndexQueryOptionsFormFilterFieldset}
            sortFieldset={TheatreIndexQueryOptionsFormSortFieldset}
            disableFields={disableFields}
            classNames={classNames}
        />
    );
}