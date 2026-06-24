/**
 * @fileoverview Form component for managing and synchronizing theatre search parameters with the URL.
 */
import {useBrowseTheatreParamForm} from "@/domains/theatres/_feat/submit-location/useBrowseTheatreParamForm.ts";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {
    BrowseTheatreParamFormStarterValues,
    BrowseTheatreParams,
    BrowseTheatreParamSchema
} from "@/domains/theatres/_feat/submit-location";
import {ReactElement, ReactNode} from "react";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Form} from "@/common/components/ui/form.tsx";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";


/** Props for the BrowseTheatreParamForm component. */
type FormProps = {
    presetValues?: Partial<BrowseTheatreParamFormStarterValues>;
    children: ReactNode;
};

/** Form wrapper that synchronises theatre location filters with search parameters. */
export function BrowseTheatreParamForm(
    {children, presetValues}: FormProps,
): ReactElement {
    const form = useBrowseTheatreParamForm({presetValues});
    const formID = useGenerateFormID("update-browse-theatre-params-form");
    const {setSearchParams} = useParsedSearchParams({schema: BrowseTheatreParamSchema});

    const updateParams = (values: BrowseTheatreParams) => {
        setSearchParams(values);
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
