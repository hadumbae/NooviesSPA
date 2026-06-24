/**
 * @fileoverview Container component for the Theatre Query Option form.
 *
 */
import {ReactElement, ReactNode} from 'react';
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";
import {Form} from "@/common/components/ui";

import {
    TheatreQueryOptionFormStarterValues,
    TheatreQueryOptions,
    TheatreQueryOptionSchema,
    useTheatreQueryOptionForm
} from "@/domains/theatres";

/** Props for the TheatreQueryOptionFormContainer component. */
type FormProps = {
    children: ReactNode;
    presetValues?: Partial<TheatreQueryOptionFormStarterValues>;
}

/**
 * Container that manages form state and synchronizes theatre query options with URL search parameters.
 */
export function TheatreQueryOptionForm(
    {children, presetValues}: FormProps
): ReactElement {
    const formID = useGenerateFormID("theatre-query-options-form");

    const {setSearchParams} = useParsedSearchParams({
        schema: TheatreQueryOptionSchema,
        defaultValues: presetValues,
    });

    const form = useTheatreQueryOptionForm({presetValues});

    const onSubmit = (values: TheatreQueryOptionFormStarterValues) => {
        setSearchParams(values as TheatreQueryOptions);
    };

    return (
        <BaseFormContextProvider formID={formID} submitHandler={onSubmit}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}


