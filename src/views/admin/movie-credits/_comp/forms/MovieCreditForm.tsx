/** @fileoverview Data container for the movie credit submission form. */

import {MovieCredit} from "@/domains/moviecredit/schemas/model/MovieCreditSchema.ts";
import {
    MovieCreditDetails
} from "@/domains/moviecredit/schemas/model/MovieCreditDetailsSchema.ts";
import {MovieCreditFormData} from "@/domains/moviecredit/_feat/submit-data/schemas/MovieCreditFormSchema.ts";
import {useMovieCreditSubmitForm} from "@/domains/moviecredit/_feat/submit-data";
import {useMovieCreditSubmitMutation} from "@/domains/moviecredit/_feat/crud-hooks";
import {FormConfigProps} from "@/common/features/submit-data";
import {ReactElement} from "react";
import {BaseFormContextProvider} from "@/common/features/generic-form-context";
import {Form} from "@/common/components/ui/form";

/** Props for the MovieCreditSubmitForm component. */
type ContainerProps = FormConfigProps<MovieCreditFormData, MovieCredit, MovieCreditDetails>;

/** Handles form orchestration and mutation lifecycle for movie credit submission. */
export function MovieCreditForm(
    {children, presetValues, editEntity, uniqueKey, resetOnSuccess, resetOnError, ...mutationProps}: ContainerProps
): ReactElement {
    const formKey = `movie-credit-submit-data-${uniqueKey ?? "form"}`;
    const form = useMovieCreditSubmitForm({presetValues, credit: editEntity});

    const mutation = useMovieCreditSubmitMutation({
        form,
        resetOptions: {onSuccess: resetOnSuccess, onError: resetOnError},
        ...mutationProps,
    });

    const submitCreditData = (values: MovieCreditFormData) => {
        mutation.mutate(values);
    };

    return (
        <BaseFormContextProvider formID={formKey} isPending={mutation.isPending}>
            <Form {...form}>
                <form id={formKey} onSubmit={form.handleSubmit(submitCreditData)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}