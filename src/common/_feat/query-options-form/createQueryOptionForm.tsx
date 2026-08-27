/**
 * @fileoverview Factory for generating type-safe query option forms and hooks to manage search parameters.
 */

import {ReactElement, useRef} from "react";
import {z, ZodObject, ZodRawShape} from "zod";
import {DefaultValues, FieldValues, useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {isEqual} from "lodash";
import {Form} from "@/views/common/_comp/ui";
import {
    generateQueryFormDefaultValues,
    QueryOptionFormContainerProps,
    QueryOptionFormContextProvider,
    QueryOptionFormValues,
    useGenerateFormID,
} from "@/common/_feat";

type FactoryConfig<TShape extends ZodRawShape> = {
    name: string;
    schema: ZodObject<TShape>;
};

type FactoryReturns<TFormValues extends FieldValues, TOptions extends FieldValues> = {
    useQueryOptionForm: (config: QueryOptionFormValues<TFormValues, TOptions>) => UseFormReturn<TFormValues, unknown, TOptions>;
    QueryOptionForm: (props: QueryOptionFormContainerProps<TFormValues, TOptions>) => ReactElement;
};

/** Generates a specialised form hook and container component for managing search and filter query options. */
export function createQueryOptionForm<
    TFormValues extends FieldValues,
    TShape extends ZodRawShape,
    TOptions extends FieldValues = z.infer<ZodObject<TShape>>
>(
    {name, schema}: FactoryConfig<TShape>
): FactoryReturns<TFormValues, TOptions> {
    const formDefaults = generateQueryFormDefaultValues({schema});

    function useDefaultValues(
        {presetValues, queryOptions}: QueryOptionFormValues<TFormValues, TOptions>
    ): TFormValues {
        const initialValues = {
            ...formDefaults,
            ...queryOptions,
            ...presetValues,
        } as TFormValues;

        const heldValues = useRef<TFormValues>(initialValues);

        if (!isEqual(heldValues.current, initialValues)) {
            heldValues.current = initialValues;
        }

        return heldValues.current;
    }

    function useQueryOptionForm(
        config: QueryOptionFormValues<TFormValues, TOptions>
    ): UseFormReturn<TFormValues, unknown, TOptions> {
        const defaultValues = useDefaultValues(config);

        return useForm<TFormValues, unknown, TOptions>({
            resolver: zodResolver(schema),
            defaultValues: defaultValues as DefaultValues<TFormValues>,
        });
    }

    function QueryOptionForm(
        params: QueryOptionFormContainerProps<TFormValues, TOptions>
    ): ReactElement {
        const {children, activeOptions, queryOptions, setQueryOptions, presetValues} = params;

        const formID = useGenerateFormID(name);
        const form = useQueryOptionForm({presetValues, queryOptions});

        const resetForm = () => form.reset(formDefaults as DefaultValues<TFormValues>);
        const updateSearchParams = (values: TOptions) => setQueryOptions(values);

        return (
            <QueryOptionFormContextProvider
                formID={formID}
                submitHandler={updateSearchParams}
                resetValues={resetForm}
                activeOptions={activeOptions}
            >
                <Form {...form}>
                    <form id={formID} onSubmit={form.handleSubmit(updateSearchParams as Parameters<typeof form.handleSubmit>[0])}>
                        {children}
                    </form>
                </Form>
            </QueryOptionFormContextProvider>
        );
    }

    return {useQueryOptionForm, QueryOptionForm};
}