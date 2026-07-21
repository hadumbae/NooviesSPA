/**
 * @fileoverview Dynamic form view for movie queries, featuring auto-submit and schema-driven fields.
 */

import {ReactElement} from 'react';
import {cn, QueryOptionFormContext, useQueryOptionFormContext} from "@/common/_feat";
import {Separator} from "@/views/common/_comp/ui/separator.tsx";
import {
    MovieQueryOptionFormSortFieldset
} from "@/views/admin/movies/_feat/submit-query-options/MovieQueryOptionFormSortFieldset.tsx";
import {
    MovieQueryOptionFormFilterFieldset
} from "@/views/admin/movies/_feat/submit-query-options/MovieQueryOptionFormFilterFieldset.tsx";
import {MovieQueryOptionFormValues} from "@/domains/movies";
import {DisableFields} from "@/common/_types";
import {useAutoFormSubmit} from "@/common/_feat/submit-data";
import {InvalidContextError} from "@/common/_err";

type FormProps = {
    disableFields?: DisableFields<MovieQueryOptionFormValues>;
    classNames?: {
        container?: string;
        filters?: string;
        sorts?: string;
    };
};

/**
 * Renders filter and sort fieldsets for movie queries with a 450ms debounce auto-submit.
 */
export function MovieQueryOptionFormView(
    {classNames, disableFields}: FormProps
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
            <MovieQueryOptionFormFilterFieldset className={classNames?.filters} disableFields={disableFields}/>
            <Separator/>
            <MovieQueryOptionFormSortFieldset className={classNames?.sorts} disableFields={disableFields}/>
        </div>
    );
}

