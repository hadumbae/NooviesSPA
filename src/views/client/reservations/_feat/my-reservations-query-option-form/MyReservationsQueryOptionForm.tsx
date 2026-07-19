/**
 * @fileoverview Form component for managing current user reservation query options.
 */

import {ReactElement, ReactNode} from "react";
import {
    CurrentUserReservationsQueryOptionFormValues, CurrentUserReservationsQueryOptions,
    CurrentUserReservationsQueryOptionSchema, useCurrentUserReservationsQueryOptionForm
} from "@/domains/reservations";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";
import {useParsedSearchParams} from "@/common/_feat";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Form} from "@/views/common/_comp/ui";

/** Props for the MyReservationsQueryOptionForm component. */
type FormProps = {
    children: ReactNode;
    presetValues?: Partial<CurrentUserReservationsQueryOptionFormValues>;
};

/**
 * Form component that synchronises reservation query options with URL search parameters.
 */
export function MyReservationsQueryOptionForm(
    {children, presetValues}: FormProps
): ReactElement {
    const formID = useGenerateFormID("my-reservations-query-options-form");

    const {searchParams, setSearchParams} = useParsedSearchParams({schema: CurrentUserReservationsQueryOptionSchema});
    const form = useCurrentUserReservationsQueryOptionForm({presetValues, editEntity: searchParams});

    const updateOptions = (values: CurrentUserReservationsQueryOptions) => {
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