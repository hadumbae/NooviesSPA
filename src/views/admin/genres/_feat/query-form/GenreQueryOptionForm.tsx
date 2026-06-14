/**
 * @fileoverview Container component for managing Genre query filters.
 * Synchronizes form state with URL search parameters for persistent filtering.
 */

import {ReactElement, ReactNode, useId} from 'react';
import {Form} from "@/common/components/ui/form.tsx";
import {FormOptions} from "@/common/_feat/submit-data";
import {GenreQueryOptionFormStarter} from "@/domains/genres/_feat/query-form/schema.ts";
import {useGenreQueryOptionForm} from "@/domains/genres/_feat/query-form/useGenreQueryOptionForm.ts";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {GenreQueryOptions, GenreQueryOptionSchema} from "@/domains/genres/schema";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";

/** Props for the {@link GenreQueryOptionForm} component. */
type ContainerProps = FormOptions<GenreQueryOptionFormStarter> & {
    children: ReactNode;
    className?: string;
};

/**
 * Orchestrates the Genre filter form logic.
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

