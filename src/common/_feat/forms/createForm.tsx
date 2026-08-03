/**
 * @fileoverview Higher-order form factory providing schema validation, mutation management, and contextual form wrapper components.
 */

import {ReactElement, ReactNode} from "react";
import {ZodObject, ZodRawShape} from "zod";
import {FieldValues, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {Form} from "@/views/common/_comp/ui";
import {
    BaseFormContextProvider,
    FormValuesConfig,
    handleFormSubmitError,
    handleMutationCallback,
    MutationFormResetConfig,
    MutationResponseConfig,
    useGenerateFormID
} from "@/common/_feat";
import {createFormHook} from "@/common/_feat/forms/createFormHook.tsx";

/** Configuration options required to instantiate the form factory. */
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

/** Props for the generated SubmitForm container component. */
type FormContainerProps<
    TFormValues extends FieldValues,
    TEntity = unknown,
    TInput = void,
    TReturns = void,
> = MutationResponseConfig<TReturns, TInput> & MutationFormResetConfig & {
    children: ReactNode;
    formConfig: FormValuesConfig<TFormValues, TEntity>
};

/** The generated hook and component returned by the form factory. */
type FactoryReturns<
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TEntity = unknown,
    TReturns = void,
> = {
    useSubmitForm: (config?: FormValuesConfig<TFormValues, TEntity>) => UseFormReturn<TFormValues, unknown, TForm>;
    SubmitForm: (props: FormContainerProps<TFormValues, TEntity, TForm, TReturns>) => ReactElement;
};

/**
 * Creates a reactive form ecosystem comprising a validation state hook and an automated submission container component.
 */
export function createForm<
    TShape extends ZodRawShape,
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TEntity = unknown,
    TReturns = void,
>(
    {formName, schema, defaultValues, mutation}: FactoryConfig<TShape, TFormValues, TForm, TReturns>
): FactoryReturns<TFormValues, TForm, TEntity, TReturns> {
    const useSubmitForm = createFormHook<TShape, TFormValues, TForm, TEntity>({schema, defaultValues});

    function SubmitForm(
        {children, formConfig, ...submitConfig}: FormContainerProps<TFormValues, TEntity, TForm, TReturns>
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