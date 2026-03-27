/**
 * @file Main container component for the reservation code search form logic.
 * @filename SetReservationUniqueCodeFormView.tsx
 */

import {useSetReservationCodeForm} from "@/domains/reservation/views/admin/reservation-by-code/forms";
import {
    FetchByCodeSearchParams,
    FetchByCodeSearchParamsSchema, SetReservationCodeFormSubmit, SetReservationCodeFormValues
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
type FormProps = FormViewOptions<SetReservationCodeFormValues> & {
    /** The child elements (inputs, buttons) to be rendered within the form context. */
    children: ReactNode;

    /** Optional CSS classes for the native form element. */
    className?: string;

    /** Initial values used to hydrate the form fields on mount. */
    presetValues?: Partial<FetchByCodeSearchParams>

    /** Optional suffix for the form's HTML ID to prevent collisions. */
    uniqueKey?: string;
};

/**
 * Orchestrates the reservation code search form and synchronizes state with URL parameters.
 */
export const SetReservationCodeForm = (
    {children, uniqueKey, presetValues, className, ...options}: FormProps
) => {
    const formKey = `set-res-unique-code-${uniqueKey ?? "form"}`;

    const form = useSetReservationCodeForm({presetValues});

    const {searchParams, setSearchParams} = useParsedSearchParams({
        schema: FetchByCodeSearchParamsSchema
    });

    const updateCode = (values: SetReservationCodeFormValues) => {
        const {code} = values as SetReservationCodeFormSubmit;
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
};