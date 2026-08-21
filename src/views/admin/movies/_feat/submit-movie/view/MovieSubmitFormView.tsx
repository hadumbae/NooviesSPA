/**
 * @fileoverview Movie submission form view for creating or editing movies.
 */

import {ReactElement} from 'react';
import {cn} from "@/common/_feat";
import {MovieFormStarterValues} from "@/domains/movies/_feat/submit-data";
import {FormViewProps} from "@/common/_feat/submit-data/formTypes.ts";
import {
    MovieSubmitFormDetailsFieldset,
    MovieSubmitFormMediaFieldset,
    MovieSubmitFormProductionFieldset
} from "@/views/admin/movies/_feat/submit-movie/fieldsets";

/** Form view component that organises movie data entry into logical fieldsets. */
export function MovieSubmitFormView(
    {className, disableFields}: FormViewProps<MovieFormStarterValues>
): ReactElement {
    return (
        <div className={cn("space-y-5", className)}>
            <MovieSubmitFormDetailsFieldset disableFields={disableFields}/>
            <MovieSubmitFormProductionFieldset disableFields={disableFields}/>
            <MovieSubmitFormMediaFieldset disableFields={disableFields}/>
        </div>
    );
}
