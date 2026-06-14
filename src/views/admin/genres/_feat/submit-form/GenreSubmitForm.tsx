/**
 * @fileoverview Container component for the Genre submission form.
 */

import {ReactElement, ReactNode, useId} from 'react';
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";
import {FormContainerConfigProps} from 'src/common/_feat/submit-data/formTypes';
import {Form} from "@/common/components/ui/form.tsx";
import {GenreFormData, useGenreSubmitForm} from "@/domains/genres/_feat/submit-form";
import {useGenreDataSubmit} from "@/domains/genres/_feat/crud-hooks";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";

/** Props for the GenreSubmitForm component. */
type SubmitFormProps = FormContainerConfigProps<GenreFormData, Genre, GenreFormData, Genre> & {
    children?: ReactNode
};

/**
 * A wrapper component that initialises React Hook Form and TanStack Mutation for Genre data.
 */
export function GenreSubmitForm(
    {children, onSubmitConfig, formConfig, resetConfig}: SubmitFormProps
): ReactElement {
    const id = useId();
    const formID = `submit-genre-data-form-${id}`;

    const form = useGenreSubmitForm(formConfig);
    const {mutate, isPending, isError} = useGenreDataSubmit({form, ...onSubmitConfig, ...resetConfig});

    const onSubmit = (values: GenreFormData) => {
        mutate(values);
    };

    return (
        <BaseFormContextProvider
            formID={formID}
            isPending={isPending}
            isError={isError}
            isEditing={!!formConfig?.editEntity}
        >
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}