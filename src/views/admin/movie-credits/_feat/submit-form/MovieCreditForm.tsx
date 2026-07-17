/** @fileoverview Data container for the movie credit submission form. */

import {MovieCredit} from "@/domains/movie-credits/_schemas/model/MovieCreditSchema.ts";
import {MovieCreditFormData} from "@/domains/movie-credits/_feat/submit-data/schemas/MovieCreditFormSchema.ts";
import {MovieCreditFormValues, useMovieCreditSubmitForm} from "@/domains/movie-credits/_feat/submit-data";
import {useMovieCreditSubmitMutation} from "@/domains/movie-credits/_feat/crud-hooks";
import {FormValuesConfig, MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {ReactElement, ReactNode, useId} from "react";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Form} from "@/common/components/ui/form";
import {handleFormSubmitError} from "@/common/_feat/error-handling/handleFormSubmitError.ts";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";
import {MovieCreditDetails} from "@/domains/movie-credits";

/** Props for the MovieCreditSubmitForm component. */
type ContainerProps = MutationResponseConfig<MovieCreditDetails, MovieCreditFormData> & MutationFormResetConfig & {
    formConfig?: FormValuesConfig<MovieCreditFormValues, MovieCredit>;
    children?: ReactNode;
}

/** Handles form orchestration and mutation lifecycle for movie credit submission. */
export function MovieCreditForm(
    {children, formConfig, ...mutationConfig}: ContainerProps
): ReactElement {
    const id = useId();
    const formID = `movie-credit-submit-data-form-${id}`;

    const form = useMovieCreditSubmitForm(formConfig);

    const {mutateAsync, isPending} = useMovieCreditSubmitMutation();

    const submitCreditData = async (values: MovieCreditFormData) => {
        handleMutationCallback({
            message: mutationConfig.submitMessage,
            cb: () => mutationConfig.onSubmit?.(values),
        });

        try {
            const result = await mutateAsync(values);
            mutationConfig.resetOnSuccess && form.reset();

            handleMutationCallback({
                message: mutationConfig.successMessage,
                messageType: "success",
                cb: () => mutationConfig.onSubmitSuccess?.(result),
            });
        } catch (error: unknown) {
            handleFormSubmitError({form, error, displayMessage: mutationConfig.errorMessage})
            mutationConfig.onSubmitError?.(error);
        }
    };

    return (
        <BaseFormContextProvider formID={formID} isPending={isPending}>
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(submitCreditData)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}