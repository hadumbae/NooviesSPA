/**
 * @fileoverview Form factory utility that abstracts React Hook Form initialization and TanStack Query mutation handling.
 */

import {ReactElement, ReactNode, useRef} from "react";
import {isEqual} from "lodash";
import {ZodObject, ZodRawShape} from "zod";
import {DefaultValues, FieldValues, useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UseMutationResult} from "@tanstack/react-query";
import {Form} from "@/views/common/_comp/ui";
import {
    BaseFormContextProvider,
    FormValuesConfig,
    handleFormSubmitError,
    handleMutationCallback,
    MutationFormResetConfig,
    MutationResponseConfig,
    QueryOptionFormContainerProps,
    QueryOptionFormValues,
    useGenerateFormID
} from "@/common/_feat";

/** Configuration parameters required by the createForm factory function. */
type FactoryConfig<
    TShape extends ZodRawShape,
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TReturns = unknown,
> = {
    formName: string;
    schema: ZodObject<TShape>;
    defaultValues: TFormValues;
    mutation: () => UseMutationResult<TReturns, unknown, TForm>;
};

/** The generated hook and component functions returned from the createForm factory. */
type FactoryReturns<TFormValues extends FieldValues, TForm extends FieldValues = TFormValues> = {
    useSubmitForm: (config: QueryOptionFormValues<TFormValues, TForm>) => UseFormReturn<TFormValues, unknown, TForm>;
    SubmitForm: (props: QueryOptionFormContainerProps<TFormValues, TForm>) => ReactElement;
};

/**
 * Creates a reusable form orchestrator supplying a custom setup hook and wrapper submission component.
 */
export function createForm<
    TShape extends ZodRawShape,
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TEntity = unknown,
    TReturns = unknown,
>(
    {formName, schema, defaultValues, mutation}: FactoryConfig<TShape, TFormValues, TForm, TReturns>
): FactoryReturns<TFormValues, TForm> {
    function useDefaultValues(
        {presetValues, editEntity}: FormValuesConfig<TFormValues, TEntity> = {}
    ): TFormValues {
        const initialValues = {
            ...defaultValues,
            ...editEntity,
            ...presetValues,
        } as TFormValues;

        const heldValues = useRef<TFormValues>(initialValues);

        if (!isEqual(heldValues.current, initialValues)) {
            heldValues.current = initialValues;
        }

        return heldValues.current;
    }

    function useSubmitForm(
        config?: FormValuesConfig<TFormValues, TEntity>
    ): UseFormReturn<TFormValues, unknown, TForm> {
        const defaultValues = useDefaultValues(config);

        return useForm<TFormValues, unknown, TForm>({
            resolver: zodResolver(schema),
            defaultValues: defaultValues as DefaultValues<TFormValues>,
        });
    }

    type FormProps = MutationResponseConfig<TReturns, TForm> & MutationFormResetConfig & {
        formConfig?: FormValuesConfig<TFormValues, TEntity>;
        children?: ReactNode
    };

    function SubmitForm(
        {children, formConfig, ...submitConfig}: FormProps
    ): ReactElement {
        const formID = useGenerateFormID(formName);

        const form = useSubmitForm(formConfig);
        const {mutateAsync, isPending, isError} = mutation();

        const submitData = async (values: TForm) => {
            try {
                handleMutationCallback({
                    message: submitConfig.submitMessage,
                    cb: () => submitConfig.onSubmit?.(values),
                });

                const data = await mutateAsync(values);

                handleMutationCallback({
                    message: submitConfig.successMessage,
                    cb: () => submitConfig.onSubmitSuccess?.(data),
                    messageType: "success",
                });
            } catch (error: unknown) {
                handleFormSubmitError({form, error, displayMessage: submitConfig.errorMessage});
                submitConfig.onSubmitError?.(error);
            }
        };

        return (
            <BaseFormContextProvider
                formID={formID}
                isPending={isPending}
                isError={isError}
                submitHandler={submitData}
            >
                <Form {...form}>
                    <form
                        id={formID}
                        onSubmit={form.handleSubmit(submitData as Parameters<typeof form.handleSubmit>[0])}
                    >
                        {children}
                    </form>
                </Form>
            </BaseFormContextProvider>
        );
    }

    return {
        useSubmitForm,
        SubmitForm,
    };
}