/**
 * @fileoverview Form for managing person search query options and URL synchronisation.
 */

import {ReactElement, ReactNode} from "react";
import {
    BrowsePersonsQueryOptionFormValues,
    BrowsePersonsQueryOptions,
    useBrowsePersonsQueryOptionForm
} from "@/domains/persons";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {useParsedSearchParams} from "@/common/_feat";
import {BrowsePersonsQueryOptionsSchema} from "@/domains/persons/_feat/client-view-data";
import {Form} from "@/views/common/_comp/ui";

type FormProps = {
    children: ReactNode;
    presetValues?: Partial<BrowsePersonsQueryOptionFormValues>;
};

/**
 * Form component that synchronises person search filters with URL search parameters.
 */
export function BrowsePersonsQueryOptionForm(
    {children, presetValues}: FormProps
): ReactElement {
    const formID = useGenerateFormID("browse-persons-query-options-form");

    const {searchParams, setSearchParams} = useParsedSearchParams({schema: BrowsePersonsQueryOptionsSchema});
    const form = useBrowsePersonsQueryOptionForm({presetValues, queryValues: searchParams});

    console.log("Errors: ", form.formState.errors);

    const updateOptions = (values: BrowsePersonsQueryOptions) => {
        console.log("Values: ", values);

        setSearchParams(values);
    }

    return (
        <BaseFormContextProvider formID={formID} submitHandler={updateOptions}>
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(updateOptions)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}