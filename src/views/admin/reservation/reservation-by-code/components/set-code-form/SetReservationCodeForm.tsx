/**
 * @file Main container component for the reservation code search form logic.
 * @filename SetReservationUniqueCodeFormView.tsx
 */

import {useSetReservationUniqueCodeForm} from "@/domains/reservation/views/admin/reservation-by-code/forms";
import {
    FetchByCodeSearchParams,
    FetchByCodeSearchParamsSchema, SetReservationUniqueCodeFormSubmit, SetReservationUniqueCodeFormValues
} from "@/domains/reservation/views/admin/reservation-by-code/schemas";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {Form} from "@/common/components/ui/form.tsx";
import {FormViewOptions} from "@/common/type/form/form-view/FormViewProps.ts";
import {
    SetReservationCodeFormContextProvider
} from "@/views/admin/reservation/reservation-by-code/components/set-code-form/SetReservationCodeFormContextProvider.tsx";
import {ReactNode} from "react";

/**
 * Props for the {@link SetReservationCodeForm} component.
 */
type FormProps = FormViewOptions<SetReservationUniqueCodeFormValues> & {
    /** The child elements (inputs, buttons) to be rendered within the form context. */
    children: ReactNode;
    /** Initial values used to hydrate the form fields on mount. */
    presetValues?: Partial<FetchByCodeSearchParams>
    /** Optional suffix for the form's HTML ID. */
    uniqueKey?: string;
};

/**
 * Orchestrates the reservation code search form and synchronizes state with URL parameters.
 */
export const SetReservationCodeForm = (
    {children, uniqueKey, presetValues, ...options}: FormProps
) => {
    /** Generates a stable DOM ID for labeling and external button association. */
    const formKey = `set-res-unique-code-${uniqueKey ?? "form"}`;

    const form = useSetReservationUniqueCodeForm({presetValues});

    /** Hook for reading/writing validated search parameters. */
    const {searchParams, setSearchParams} = useParsedSearchParams({
        schema: FetchByCodeSearchParamsSchema
    });

    /** Updates the browser URL with the validated form values. */
    const updateCode = (values: SetReservationUniqueCodeFormValues) => {
        const {code} = values as SetReservationUniqueCodeFormSubmit;
        setSearchParams({...searchParams, code});
    }

    return (
        <SetReservationCodeFormContextProvider formID={formKey} {...options}>
            <Form {...form}>
                <form id={formKey} onSubmit={form.handleSubmit(updateCode)}>
                    {children}
                </form>
            </Form>
        </SetReservationCodeFormContextProvider>
    );
};