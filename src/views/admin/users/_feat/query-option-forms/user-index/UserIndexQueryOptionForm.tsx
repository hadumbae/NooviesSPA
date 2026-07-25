import {ReactElement} from "react";
import {
    generateQueryFormDefaultValues,
    QueryOptionFormContainerProps,
    QueryOptionFormContextProvider,
    useGenerateFormID
} from "@/common/_feat";
import {UserIndexQueryOptionFormValues, useUserIndexQueryOptionForm} from "@/domains/users/_feat/submit-query-options";
import {UserQueryOptions, UserQueryOptionsSchema} from "@/domains/users";
import {Form} from "@/views/common/_comp/ui";

type FormProps = QueryOptionFormContainerProps<UserIndexQueryOptionFormValues, UserQueryOptions>;

export function UserIndexQueryOptionForm(
    {children, activeOptions, queryOptions, setQueryOptions, presetValues}: FormProps
): ReactElement {
    const formID = useGenerateFormID("user-index-query-option-form");
    const form = useUserIndexQueryOptionForm({presetValues, queryOptions});

    const defaultValues = generateQueryFormDefaultValues({schema: UserQueryOptionsSchema});
    const resetForm = () => form.reset(defaultValues);

    const updateSearchParams = (values: UserQueryOptions) => {
        setQueryOptions(values);
    };

    return (
        <QueryOptionFormContextProvider
            formID={formID}
            submitHandler={updateSearchParams}
            resetValues={resetForm}
            activeOptions={activeOptions}
        >
            <Form {...form}>
                <form id={formID} onSubmit={form.handleSubmit(updateSearchParams)}>
                    {children}
                </form>
            </Form>
        </QueryOptionFormContextProvider>
    );
}