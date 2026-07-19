/**
 * @fileoverview Container component for the Theatre Showing query form.
 *
 */

import {ReactElement, ReactNode} from "react";
import {Form} from "@/views/common/_comp/ui";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {useTheatreScheduleQueryForm} from "@/domains/showings";
import {
    ShowingsPageQueryFormStarterValues,
    ShowingsPageQueryStrings,
    ShowingsPageQueryStringSchema
} from "@/domains/movies";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";

/** Props for the TheatreShowingQueryForm component. */
type FormParams = {
    children: ReactNode;
    presetValues?: Partial<ShowingsPageQueryFormStarterValues>;
}

/** Form container that synchronises theatre showing filters with URL search parameters. */
export function TheatreShowingQueryForm(
    {children, presetValues}: FormParams
): ReactElement {
    const formID = useGenerateFormID("theatre-showing-query-form");

    const form = useTheatreScheduleQueryForm({presetValues});
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
