/**
 * @fileoverview Layout view component for the movie index query option form.
 */

import {ReactElement} from "react";
import {QueryOptionFormViewProps} from "@/common/_feat";
import {MovieQueryOptionFormValues} from "@/domains/movies";
import {QueryOptionFormLayout} from "@/views/common/_feat";
import {
    MovieIndexQueryOptionFormFilterFieldset
} from "@/views/admin/movies/_feat/query-options-form/MovieIndexQueryOptionFormFilterFieldset.tsx";
import {
    MovieIndexQueryOptionFormSortFieldset
} from "@/views/admin/movies/_feat/query-options-form/MovieIndexQueryOptionFormSortFieldset.tsx";

/** Renders the combined filter and sort fieldsets for movie index query options. */
export function MovieIndexQueryOptionFormView(
    {classNames, disableFields, hideFields}: QueryOptionFormViewProps<MovieQueryOptionFormValues>
): ReactElement {
    return (
        <QueryOptionFormLayout
            filterFieldset={MovieIndexQueryOptionFormFilterFieldset}
            sortFieldset={MovieIndexQueryOptionFormSortFieldset}
            disableFields={disableFields}
            hideFields={hideFields}
            classNames={classNames}
        />
    );
}