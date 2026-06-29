/** @fileoverview Presentational form view for creating or editing movie credits. */

import {cn} from "@/common/lib/utils.ts";
import {useFormContext} from "react-hook-form";
import {Separator} from "@/common/components/ui";
import {ReactElement} from "react";
import {
    MovieCreditFormCastFieldset,
    MovieCreditFormCastFlagFieldset,
    MovieCreditFormDetailsFieldset,
} from "@/views/admin/movie-credits/_feat/submit-form/fieldsets";

import {DisableFields} from "@/common/types";
import {MovieCreditFormValues} from "@/domains/movie-credits";

/** Props for the MovieCreditFormView component. */
type ViewProps = {
    disableFields?: DisableFields<MovieCreditFormValues>;
    className?: string;
}

/** Renders the movie credit form fields and submission actions. Requires wrapping in a Form provider and BaseFormContext. */
export function MovieCreditFormView(
    {className, disableFields}: ViewProps
): ReactElement {
    const {watch} = useFormContext();
    const department = watch("department");

    return (
        <div className={cn("space-y-4", className)}>
            <MovieCreditFormDetailsFieldset disableFields={disableFields}/>

            <Separator/>

            {department === "CAST" && <>
                <MovieCreditFormCastFieldset disableFields={disableFields}/>
                <Separator/>
            </>}

            {department === "CAST" && <>
                <MovieCreditFormCastFlagFieldset disableFields={disableFields}/>
                <Separator/>
            </>}
        </div>
    );
}