/**
 * @fileoverview Container component for managing Genre query filters and URL synchronization.
 */

import {ReactElement, ReactNode, useId} from 'react';
import {FormOptions} from "@/common/_feat/submit-data";
import {useGenreQueryOptionForm} from "@/domains/genres/_feat/query-form/form/useGenreQueryOptionForm.ts";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {GenreQueryOptionFormStarter, GenreQueryOptions, GenreQueryOptionSchema} from "@/domains/genres";
import {Form} from "@/common/components/ui";

/** Props for the {@link GenreQueryOptionForm} component. */
type ContainerProps = FormOptions<GenreQueryOptionFormStarter> & {
    children: ReactNode;
    className?: string;
};

/**
 * Orchestrates the Genre filter form logic and synchronizes state with search parameters.
 */
export function GenreQueryOptionForm(
    {children, presetValues, className}: ContainerProps
): ReactElement {
    const id = useId();
    const formKey = `set-genre-query-option-form-${id}`;

    const form = useGenreQueryOptionForm({presetValues});
    const {setSearchParams} = useParsedSearchParams({schema: GenreQueryOptionSchema});

    const onSubmit = (values: GenreQueryOptionFormStarter): void => {
        setSearchParams(values as GenreQueryOptions);
    };

    return (
        <BaseFormContextProvider formID={formKey} submitHandler={onSubmit}>
            <Form {...form}>
                <form id={formKey} className={className} onSubmit={form.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}
