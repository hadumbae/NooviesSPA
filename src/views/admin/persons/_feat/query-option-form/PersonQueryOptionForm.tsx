/**
 * @fileoverview Container component that synchronises the person query form state with URL search parameters.
 */

import {ReactElement, ReactNode} from 'react';
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Form} from "@/views/common/_comp/ui";
import {
    PersonQueryOptionFormValues,
    PersonQueryOptions,
    PersonQueryOptionsSchema,
    usePersonQueryOptionForm
} from "@/domains/persons";

/** Props for the PersonQueryOptionFormContainer component. */
type ContainerProps = {
    children: ReactNode;
    presetValues?: Partial<PersonQueryOptionFormValues>;
}

/** Controller component that manages person query form initialisation and URL synchronisation. */
export function PersonQueryOptionForm(
    {children, presetValues}: ContainerProps
): ReactElement {
    const formID = useGenerateFormID("person-query-option-form");
    const form = usePersonQueryOptionForm({presetValues});
    const {setSearchParams} = useParsedSearchParams({schema: PersonQueryOptionsSchema});
    const updateSearch = (values: PersonQueryOptions) => setSearchParams(values);

    return (
        <BaseFormContextProvider formID={formID}>
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(updateSearch)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}


