/**
 * @fileoverview Container component for managing movie search query parameter forms.
 */

import {ReactElement} from 'react';
import {Form} from "@/views/common/_comp/ui";
import {
    MovieQueryOptionFormValues,
    MovieQueryOptions,
    MovieQueryOptionSchema,
    useMovieQueryOptionForm
} from "@/domains/movies";
import {
    filterFalsyAttributes,
    generateQueryFormDefaultValues,
    QueryOptionFormContainerProps,
    QueryOptionFormContextProvider,
    useGenerateFormID
} from "@/common/_feat";

type FormContainerProps = QueryOptionFormContainerProps<MovieQueryOptionFormValues, MovieQueryOptions>;

/**
 * Container that synchronises movie query form values with URL search parameters.
 */
export function MovieQueryOptionForm(
    {children, activeOptions, queryOptions, setQueryOptions, presetValues}: FormContainerProps
): ReactElement {
    const formID = useGenerateFormID("movie-query-option-form");
    const form = useMovieQueryOptionForm({presetValues, queryOptions});

    const defaultValues = generateQueryFormDefaultValues({schema: MovieQueryOptionSchema});
    const resetForm = () => form.reset(defaultValues);

    const updateSearchParams = (values: MovieQueryOptions) => {
        const filtered = filterFalsyAttributes(values);
        setQueryOptions(filtered);
    };

    return (
        <QueryOptionFormContextProvider
            formID={formID}
            submitHandler={updateSearchParams}
            resetValues={resetForm}
            activeOptions={activeOptions}
        >
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(updateSearchParams)}>
                    {children}
                </form>
            </Form>
        </QueryOptionFormContextProvider>
    );
}


