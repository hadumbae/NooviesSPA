/**
 * @fileoverview Dynamic form view for movie queries, featuring auto-submit and schema-driven fields.
 */

import {ReactElement} from 'react';
import {SearchParamFormViewProps} from "@/common/type/form/SearchParamFormProps.ts";
import {MovieQueryOptionFormValues} from "@/domains/movies/schema/queries/MovieQueryOptionFormValueSchema.ts";
import {Form} from "@/common/components/ui/form.tsx";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {MovieQueryOptionSchema} from "@/domains/movies/schema/queries/MovieQueryOption.schema.ts";
import useDebouncedFormAutoSubmit from "@/common/hooks/forms/useDebouncedFormAutoSubmit.ts";
import {cn} from "@/common/lib/utils.ts";
import {Separator} from "@/common/components/ui/separator.tsx";
import MovieQueryOptionFormSortFieldset
    from "@/domains/movies/components/features/admin/movie-query-option/MovieQueryOptionFormSortFieldset.tsx";
import {
    MovieQueryOptionFormFilterFieldset
} from "@/domains/movies/components/features/admin/movie-query-option/MovieQueryOptionFormFilterFieldset.tsx";

type FormViewProps = SearchParamFormViewProps<MovieQueryOptionFormValues>;

/**
 * Renders filter and sort fieldsets for movie queries with a 450ms debounce auto-submit.
 */
function MovieQueryOptionFormView(
    {form, className, disableFields, submitHandler}: FormViewProps
): ReactElement {
    useDebouncedFormAutoSubmit({form, submitHandler, timeout: 450});

    const activeFields = getActiveSchemaInputFields({
        disableFields,
        schema: MovieQueryOptionSchema
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn(className, "space-y-4")}
            >
                <MovieQueryOptionFormFilterFieldset form={form} activeFields={activeFields}/>
                <Separator/>
                <MovieQueryOptionFormSortFieldset form={form} activeFields={activeFields}/>
            </form>
        </Form>
    );
}

export default MovieQueryOptionFormView;