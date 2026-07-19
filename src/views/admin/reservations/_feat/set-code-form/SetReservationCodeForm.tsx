/**
 * @fileoverview Main container component for the reservation code search form logic.
 */

import {ReactElement, ReactNode} from "react";
import {Form} from "@/views/common/_comp/ui";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {
    FetchByCodeSearchParams,
    FetchByCodeSearchParamsSchema,
    SetReservationCodeFormData,
    SetReservationCodeFormValues,
    useSetReservationCodeForm
} from "@/domains/reservations";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";

/** Props for the SetReservationCodeForm component. */
export type FormProps = {
    children: ReactNode;
    className?: string;
    presetValues?: Partial<FetchByCodeSearchParams>
};

/**
 * Orchestrates the reservation code search form and synchronises state with URL parameters.
 */
export function SetReservationCodeForm(
    {children, presetValues, className}: FormProps
): ReactElement {
    const formID = useGenerateFormID("set-res-unique-code-form");
    const form = useSetReservationCodeForm({presetValues});

    const {searchParams, setSearchParams} = useParsedSearchParams({schema: FetchByCodeSearchParamsSchema});
    const updateCode = (values: SetReservationCodeFormValues) => {
        const {code} = values as SetReservationCodeFormData;
        setSearchParams({...searchParams, code});
    }

    return (
        <BaseFormContextProvider formID={formID}>
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(updateCode)} className={className}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}