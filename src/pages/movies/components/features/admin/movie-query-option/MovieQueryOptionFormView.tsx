/**
 * @file MovieQueryOptionFormView.tsx
 * @description
 * Provides a dynamic and schema-driven filter and sort form for querying movies.
 * This component integrates with `react-hook-form` and uses a Zod schema to dynamically
 * enable or disable form fields based on configuration. It supports auto-submission with
 * a debounce delay, ideal for real-time search or filtering UIs.
 */

import {FC} from 'react';
import {SearchParamFormViewProps} from "@/common/type/form/SearchParamFormProps.ts";
import {MovieQueryOptionFormValues} from "@/pages/movies/schema/queries/MovieQueryOptionFormValueSchema.ts";
import {Form} from "@/common/components/ui/form.tsx";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {MovieQueryOptionSchema} from "@/pages/movies/schema/queries/MovieQueryOption.schema.ts";
import useDebouncedFormAutoSubmit from "@/common/hooks/forms/useDebouncedFormAutoSubmit.ts";
import {cn} from "@/common/lib/utils.ts";
import {Separator} from "@/common/components/ui/separator.tsx";
import MovieQueryOptionFormSortFieldset
    from "@/pages/movies/components/features/admin/movie-query-option/MovieQueryOptionFormSortFieldset.tsx";
import MovieQueryOptionFormFilterFieldset
    from "@/pages/movies/components/features/admin/movie-query-option/MovieQueryOptionFormFilterFieldset.tsx";

type FormViewProps = SearchParamFormViewProps<MovieQueryOptionFormValues>;

const MovieQueryOptionFormView: FC<FormViewProps> = (props) => {
    const {form, className, disableFields, submitHandler} = props;
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
                {/* Filters */}
                <MovieQueryOptionFormFilterFieldset
                    form={form}
                    activeFields={activeFields}
                />

                <Separator/>

                {/* Sorts */}
                <MovieQueryOptionFormSortFieldset
                    form={form}
                    activeFields={activeFields}
                />
            </form>
        </Form>
    );
};

export default MovieQueryOptionFormView;
