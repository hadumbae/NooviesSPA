/**
 * @fileoverview Form component for managing and synchronizing theatre search parameters with the URL.
 */
import {useBrowseTheatreParamForm} from "@/domains/theatres/_feat/submit-location/useBrowseTheatreParamForm.ts";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {
    BrowseTheatreParamFormStarterValues,
    BrowseTheatreParams,
    BrowseTheatreParamSchema
} from "@/domains/theatres/_feat/submit-location";
import {ReactNode} from "react";
import {BaseFormContextProvider} from "@/common/features/generic-form-context";
import {Form} from "@/common/components/ui/form.tsx";


/** Props for the BrowseTheatreParamForm component. */
type FormProps = {
    presetValues?: Partial<BrowseTheatreParamFormStarterValues>;
    children: ReactNode;
    uniqueKey?: string;
};

/** Form wrapper that synchronises theatre location filters with search parameters. */
export const BrowseTheatreParamForm = (
    {children, presetValues, uniqueKey}: FormProps,
) => {
    const formKey = `update-browse-theatre-params-${uniqueKey ?? "form"}`;

    const form = useBrowseTheatreParamForm({presetValues});
    const {setSearchParams} = useParsedSearchParams({schema: BrowseTheatreParamSchema});

    const updateParams = (values: BrowseTheatreParams) => {
        setSearchParams(values);
    };

    return (
        <BaseFormContextProvider formID={formKey} submitHandler={updateParams}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(updateParams)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
};
