/**
 * @fileoverview Container component for the Theatre Showing query form.
 *
 */

import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {
    useTheatreShowingQueryForm
} from "@/domains/showings/hooks/forms/theatre-showing-query-form/useTheatreShowingQueryForm.ts";
import {
    ShowingsPageQueryFormStarterValues,
    ShowingsPageQueryStrings,
    ShowingsPageQueryStringSchema
} from "@/domains/movies/_feat/client-view-data";
import {ReactElement, ReactNode, useId} from "react";
import {BaseFormContextProvider} from "@/common/features/generic-form-context";
import {Form} from "@/common/components/ui/form.tsx";

/** Props for the TheatreShowingQueryForm component. */
type FormParams = {
    children: ReactNode;
    presetValues?: Partial<ShowingsPageQueryFormStarterValues>;
}

/** Form container that synchronises theatre showing filters with URL search parameters. */
export function TheatreShowingQueryForm(
    {children, presetValues}: FormParams
): ReactElement {
    const id = useId();
    const formID = `theatre-showing-query-form-${id}`;

    const form = useTheatreShowingQueryForm({presetValues});
    const {setSearchParams} = useParsedSearchParams({schema: ShowingsPageQueryStringSchema});

    const updateParams = (values: ShowingsPageQueryFormStarterValues) => {
        setSearchParams(values as ShowingsPageQueryStrings);
    };

    return (
        <BaseFormContextProvider formID={formID} submitHandler={updateParams}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(updateParams)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}
