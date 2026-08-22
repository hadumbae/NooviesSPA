/** @fileoverview Presentational form view for creating or editing movie credits. */

import {cn, FormViewProps} from "@/common/_feat";
import {useFormContext} from "react-hook-form";
import {Separator} from "@/views/common/_comp/ui";
import {ReactElement} from "react";
import {MovieCreditFormValues} from "@/domains/movie-credits/_feat/submit-data/schemas";
import {
    MovieCreditFormCastFieldset,
    MovieCreditFormCastFlagFieldset,
    MovieCreditFormDetailsFieldset,
} from "@/views/admin/movie-credits/_feat/submit-form/fieldsets";

/** Renders the movie credit form fields and submission actions. Requires wrapping in a Form provider and BaseFormContext. */
export function MovieCreditFormView(
    {className, disableFields, hideFields}: FormViewProps<MovieCreditFormValues>
): ReactElement {
    const {watch} = useFormContext();
    const department = watch("department");

    return (
        <div className={cn("space-y-4", className)}>
            <MovieCreditFormDetailsFieldset
                disableFields={disableFields}
                hideFields={hideFields}
            />

            <Separator/>

            {department === "CAST" && <>
                <MovieCreditFormCastFieldset
                    disableFields={disableFields}
                    hideFields={hideFields}
                />
            </>}

            {department === "CAST" && <>
                <MovieCreditFormCastFlagFieldset
                    disableFields={disableFields}
                    hideFields={hideFields}
                />
            </>}
        </div>
    );
}