/**
 * @fileoverview Container component for managing movie search query parameter forms.
 */

import {ReactElement, ReactNode} from 'react';
import {useMovieQueryOptionForm} from "@/domains/movies/_feat/submit-queries/useMovieQueryOptionForm.ts";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {MovieQueryOptions, MovieQueryOptionSchema} from "@/domains/movies/_schema/queries";
import {
    filterFalsyAttributes
} from "@/common/_feat/filter-object-attributes/filterFalsyAttributes.ts";
import {MovieQueryOptionFormValues} from "@/domains/movies/_feat/submit-queries/MovieQueryOptionFormValues";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Form} from "@/common/components/ui";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";

/** Props for the MovieQueryOptionFormContainer component. */
type FormContainerProps = {
    children: ReactNode;
    presetValues?: Partial<MovieQueryOptionFormValues>;
}

/**
 * Container that synchronises movie query form values with URL search parameters.
 */
export function MovieQueryOptionForm(
    {children, presetValues}: FormContainerProps
): ReactElement {
    const formID = useGenerateFormID("movie-query-option-form");
    const form = useMovieQueryOptionForm({presetValues});

    const {setSearchParams} = useParsedSearchParams({
        schema: MovieQueryOptionSchema,
        defaultValues: presetValues,
    });

    const updateSearchParams = (values: MovieQueryOptionFormValues) => {
        const filtered_values = filterFalsyAttributes(values) as MovieQueryOptions;
        setSearchParams(filtered_values);
    };

    return (
        <BaseFormContextProvider formID={formID} submitHandler={updateSearchParams}>
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(updateSearchParams)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}


