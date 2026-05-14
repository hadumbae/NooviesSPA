/**
 * @fileoverview Movie submission form view for creating or editing movies.
 *
 */

import {ReactElement} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {MovieFormStarterValues} from "@/domains/movies/_feat/submit-data";
import {FormViewProps} from "@/common/features/submit-data/formTypes.ts";
import {
    MovieSubmitFormDetailsFieldset
} from "@/views/admin/movies/_feat/submit-movie/fieldsets/MovieSubmitFormDetailsFieldset.tsx";
import {
    MovieSubmitFormProductionFieldset
} from "@/views/admin/movies/_feat/submit-movie/fieldsets/MovieSubmitFormProductionFieldset.tsx";
import {MovieSubmitFormMediaFieldset} from "./fieldsets/MovieSubmitFormMediaFieldset.tsx";

/** Props for the MovieSubmitFormView component. */
type ViewProps = Pick<FormViewProps<MovieFormStarterValues>, "className" | "disableFields">;

/** Form view component that organises movie data entry into logical fieldsets. */
export function MovieSubmitFormView(
    {className, disableFields}: ViewProps
): ReactElement {
    return (
        <div className={cn("space-y-5", className)}>
            <MovieSubmitFormDetailsFieldset disableFields={disableFields}/>
            <MovieSubmitFormProductionFieldset disableFields={disableFields}/>
            <MovieSubmitFormMediaFieldset disableFields={disableFields}/>
        </div>
    );
}
