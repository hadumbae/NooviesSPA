/**
 * @fileoverview Container component for handling movie submission logic and form state.
 */

import {ReactElement} from 'react';
import buildFormSubmitLog from "@/common/utility/features/logger/buildFormSubmitLog.ts";
import {MovieFormData, MovieFormStarterValues, useMovieSubmitForm} from "@/domains/movies/_feat/submit-data";
import {useMovieSubmitMutation} from "@/domains/movies/_feat/crud-hooks";
import {FormConfigProps} from "@/common/features/submit-data";
import {Movie} from "@/domains/movies/schema/movie";
import {BaseFormContextProvider} from "@/common/features/generic-form-context";
import {Form} from "@/common/components/ui/form.tsx";

/**
 * Orchestrates movie data submission by providing form context and handling mutation triggers.
 * Requires a uniqueKey for form identification.
 */
export function MovieSubmitForm(
    props: FormConfigProps<MovieFormStarterValues, Movie, Movie>
): ReactElement {
    const {children, uniqueKey, presetValues, resetOnSuccess, resetOnError, editEntity, ...onSubmitProps} = props;

    const formKey = `form-submit-movie-data-${uniqueKey ?? "1"}`;

    const form = useMovieSubmitForm({movie: editEntity, presetValues});
    const {mutate, isPending} = useMovieSubmitMutation({form, ...onSubmitProps});

    const submitMovieData = (values: MovieFormData) => {
        buildFormSubmitLog({
            values,
            msg: "Movie Submit Values",
            component: MovieSubmitForm.name
        });

        mutate(values);
    };

    return (
        <BaseFormContextProvider formID={formKey} isPending={isPending} submitHandler={submitMovieData}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitMovieData)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}
