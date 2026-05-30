/**
 * @fileoverview Main container component for the reservation code search form logic.
 */

import {useSetReservationCodeForm} from "@/domains/reservation/_feat/fetch-reservation-by-code/forms";
import {
    FetchByCodeSearchParams,
    FetchByCodeSearchParamsSchema, SetReservationCodeFormData, SetReservationCodeFormValues
} from "@/domains/reservation/_feat/fetch-reservation-by-code/schemas";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {Form} from "@/common/components/ui/form.tsx";
import {FormViewOptions} from "@/common/type/form/form-view/FormViewProps.ts";
import {
    SetReservationCodeFormContextProvider
} from "@/views/admin/reservations/_feat/set-code-form/SetReservationCodeFormContextProvider.tsx";
import {ReactElement, ReactNode} from "react";

/** Props for the SetReservationCodeForm component. */
export type FormProps = FormViewOptions<SetReservationCodeFormValues> & {
    children: ReactNode;
    className?: string;
    presetValues?: Partial<FetchByCodeSearchParams>
    uniqueKey?: string;
};

/**
 * Orchestrates the reservation code search form and synchronizes state with URL parameters.
 */
export function SetReservationCodeForm(
    {children, uniqueKey, presetValues, className, ...options}: FormProps
): ReactElement {
    const formKey = `set-res-unique-code-${uniqueKey ?? "form"}`;

    const form = useSetReservationCodeForm({presetValues});

    const {searchParams, setSearchParams} = useParsedSearchParams({
        schema: FetchByCodeSearchParamsSchema
    });

    const updateCode = (values: SetReservationCodeFormValues) => {
        const {code} = values as SetReservationCodeFormData;
        setSearchParams({...searchParams, code});
    }

    return (
        <SetReservationCodeFormContextProvider formID={formKey} {...options}>
            <Form {...form}>
                <form id={formKey} onSubmit={form.handleSubmit(updateCode)} className={className}>
                    {children}
                </form>
            </Form>
        </SetReservationCodeFormContextProvider>
    );
}