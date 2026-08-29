/**
 * @fileoverview Form view component for rendering genre index query filter and sort fieldsets.
 */

import {ReactElement} from "react";
import {QueryOptionFormViewProps} from "@/common/_feat";
import {GenreIndexQueryOptionsFormValues} from "@/domains/genres";
import {
    GenreIndexQueryOptionsFormFilterFieldset
} from "@/views/admin/genres/_feat/submit-genre-index-query-options/GenreIndexQueryOptionsFormFilterFieldset.tsx";
import {
    GenreIndexQueryOptionsFormSortFieldset
} from "@/views/admin/genres/_feat/submit-genre-index-query-options/GenreIndexQueryOptionsFormSortFieldset.tsx";
import {QueryOptionFormLayout} from "@/views/common/_feat";

/** Form view that combines filter and sort fieldsets for genre index query options. */
export function GenreIndexQueryOptionsFormView(
    {classNames, hideFields, disableFields}: QueryOptionFormViewProps<GenreIndexQueryOptionsFormValues>
): ReactElement {
    return (
        <QueryOptionFormLayout
            filterFieldset={GenreIndexQueryOptionsFormFilterFieldset}
            sortFieldset={GenreIndexQueryOptionsFormSortFieldset}
            hideFields={hideFields}
            disableFields={disableFields}
            classNames={classNames}
        />
    );
}