/**
 * @fileoverview Dynamic form view for movie queries, featuring auto-submit and schema-driven fields.
 */

import {ReactElement} from 'react';
import {cn} from "@/common/_feat";
import {Separator} from "@/views/common/_comp/ui/separator.tsx";
import {
    MovieQueryOptionFormSortFieldset
} from "@/views/admin/movies/_feat/submit-query-options/MovieQueryOptionFormSortFieldset.tsx";
import {
    MovieQueryOptionFormFilterFieldset
} from "@/views/admin/movies/_feat/submit-query-options/MovieQueryOptionFormFilterFieldset.tsx";
import {MovieQueryOptionFormValues} from "@/domains/movies";
import {DisableFields} from "@/common/_types";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {useAutoFormSubmit} from "@/common/_feat/submit-data";

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
    const {submitHandler} = useBaseFormContext();

    if (!submitHandler) {
        throw new Error(`'${MovieQueryOptionFormView.name}' requires a 'submitHandler'.`);
    }

    useAutoFormSubmit({submitHandler, timeout: 450});

    return (
        <div className={cn("space-y-4", classNames?.container)}>
            <MovieQueryOptionFormFilterFieldset
                className={classNames?.filters}
                disableFields={disableFields}
            />

            <Separator/>

            <MovieQueryOptionFormSortFieldset
                className={classNames?.sorts}
                disableFields={disableFields}
            />
        </div>
    );
}

