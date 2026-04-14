/**
 * @fileoverview Container component for the Genre submission form.
 * Orchestrates form state, validation, and data mutation logic.
 */

import {ReactElement, ReactNode} from 'react';
import useGenreDataSubmit from "@/domains/genres/_feat/crud-hooks/useGenreDataSubmit.ts";
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";
import {FormOptions} from '@/common/features/submit-data/formTypes';
import {MutationResponseConfig} from "@/common/features/submit-data";
import {Form} from "@/common/components/ui/form.tsx";
import {GenreFormContextProvider, GenreFormData, useGenreSubmitForm} from "@/domains/genres/_feat/submit-form";

/**
 * Props for the {@link GenreSubmitForm} component.
 */
type SubmitFormProps = FormOptions<GenreFormData, Genre> & MutationResponseConfig<Genre> & {
    children: ReactNode;
    uniqueKey?: string;
};

/**
 * A wrapper component that initializes React Hook Form and TanStack Mutation
 * for Genre data, providing context to nested child inputs.
 */
export function GenreSubmitForm(
    params: SubmitFormProps
): ReactElement {
    const {
        children,
        uniqueKey,
        presetValues,
        editEntity,
        resetOnSuccess,
        resetOnError,
        ...mutationParams
    } = params;

    const formKey = `submit-genre-data-${uniqueKey ?? "form"}`;

    const form = useGenreSubmitForm({genre: editEntity, presetValues});

    const {mutate, isPending} = useGenreDataSubmit({
        form,
        resetForm: {onSuccess: resetOnSuccess, onError: resetOnError},
        ...mutationParams,
    });

    const onSubmit = (values: GenreFormData) => {
        mutate(values);
    };

    return (
        <GenreFormContextProvider formID={formKey} isPending={isPending}>
            <Form {...form}>
                <form id={formKey} onSubmit={form.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </Form>
        </GenreFormContextProvider>
    );
}