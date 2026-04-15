/**
 * @fileoverview Container component for managing Genre query filters.
 * Synchronizes form state with URL search parameters for persistent filtering.
 */

import {ReactElement, ReactNode} from 'react';
import {GenreQueryOptions} from "@/domains/genres/schema/filters/GenreQueryOptions.types.ts";
import useGenreQueryOptionSearchParams from "@/domains/genres/fetch/useGenreQueryOptionSearchParams.ts";
import {Form} from "@/common/components/ui/form.tsx";
import {FormOptions} from "@/common/features/submit-data";
import {GenreQueryOptionFormStarter} from "@/domains/genres/_feat/query-form/schema.ts";
import {useGenreQueryOptionForm} from "@/domains/genres/_feat/query-form/useGenreQueryOptionForm.ts";
import {GenreQueryOptionFormContextProvider} from "@/domains/genres/_feat/query-form";

/** Props for the {@link GenreQueryOptionForm} component. */
type ContainerProps = FormOptions<GenreQueryOptionFormStarter> & {
    /** The form fields or UI to render within the provider. */
    children: ReactNode;
    /** Optional identifier to prevent ID collisions in the DOM. */
    uniqueKey?: string;
    /** Additional CSS classes for the form element. */
    className?: string;
};

/**
 * Orchestrates the Genre filter form logic.
 */
export function GenreQueryOptionForm(
    {children, uniqueKey, presetValues, className}: ContainerProps
): ReactElement {
    const formKey = `set-genre-query-option-${uniqueKey ?? "form"}`;

    const form = useGenreQueryOptionForm({presetValues});
    const {setSearchParams} = useGenreQueryOptionSearchParams();

    const onSubmit = (values: GenreQueryOptionFormStarter): void => {
        setSearchParams(values as GenreQueryOptions);
    };

    return (
        <GenreQueryOptionFormContextProvider formID={formKey} submitHandler={onSubmit}>
            <Form {...form}>
                <form id={formKey} className={className} onSubmit={form.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </Form>
        </GenreQueryOptionFormContextProvider>
    );
}

export default GenreQueryOptionForm;