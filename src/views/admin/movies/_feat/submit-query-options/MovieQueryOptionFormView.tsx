/**
 * @fileoverview Dynamic form view for movie queries, featuring auto-submit and schema-driven fields.
 */

import {ReactElement} from 'react';
import {cn, QueryOptionFormContext, QueryOptionFormViewProps, useQueryOptionFormContext} from "@/common/_feat";
import {Separator} from "@/views/common/_comp/ui/separator.tsx";
import {
    MovieIndexQueryOptionFormSortFieldset
} from "@/views/admin/movies/_feat/query-options-form/MovieIndexQueryOptionFormSortFieldset.tsx";
import {
    MovieIndexQueryOptionFormFilterFieldset
} from "@/views/admin/movies/_feat/query-options-form/MovieIndexQueryOptionFormFilterFieldset.tsx";
import {MovieQueryOptionFormValues} from "@/domains/movies";
import {useAutoFormSubmit} from "@/common/_feat/submit-data";
import {InvalidContextError} from "@/common/_err";

/**
 * Renders filter and sort fieldsets for movie queries with a 450ms debounce auto-submit.
 */ export function MovieQueryOptionFormView(
    {classNames, disableFields}: QueryOptionFormViewProps<MovieQueryOptionFormValues>
): ReactElement {
    const {submitHandler} = useQueryOptionFormContext();

    if (!submitHandler) {
        throw new InvalidContextError({
            code: "invalid_values",
            contextName: QueryOptionFormContext.displayName,
            message: `A 'submitHandler' is required for '${QueryOptionFormContext.displayName}'.`,
        });
    }

    useAutoFormSubmit({submitHandler, timeout: 450});

    return (
        <div className={cn("space-y-4", classNames?.container)}>
            <MovieIndexQueryOptionFormFilterFieldset className={classNames?.filters} disableFields={disableFields}/>
            <Separator/>
            <MovieIndexQueryOptionFormSortFieldset className={classNames?.sorts} disableFields={disableFields}/>
        </div>
    );
}

