/**
 * @fileoverview Form container for managing and synchronizing Role Type query options with URL search parameters.
 */

import {ReactElement, ReactNode} from 'react';
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {Form} from "@/common/components/ui/form.tsx";
import {RoleTypeQueryOptions, RoleTypeQueryOptionsSchema, useRoleTypeQueryOptionForm} from "@/domains/roletype";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";

/** Props for the RoleTypeQueryOptionForm component. */
type FormProps = {
    children: ReactNode;
    presetValues?: Partial<RoleTypeQueryOptions>;
};

/**
 * Container component that initialises the Role Type query form and synchronises state with URL search parameters.
 */
export function RoleTypeQueryOptionForm(
    {children, presetValues}: FormProps
): ReactElement {
    const formID = useGenerateFormID("role-type-query-option-form");

    const {searchParams, setSearchParams} = useParsedSearchParams({
        schema: RoleTypeQueryOptionsSchema,
        defaultValues: presetValues,
    });

    const form = useRoleTypeQueryOptionForm({presetValues: searchParams});
    const onSubmit = (values: RoleTypeQueryOptions) => setSearchParams(values);

    return (
        <BaseFormContextProvider formID={formID} submitHandler={onSubmit}>
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </Form>
        </BaseFormContextProvider>
    );
}
