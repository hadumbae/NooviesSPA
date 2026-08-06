/**
 * @fileoverview Higher-order factory function for creating reusable form container components integrated with React Hook Form and TanStack Query mutations.
 */

import {ReactElement, ReactNode} from "react";
import {FieldValues, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {Form} from "@/views/common/_comp/ui";
import {FormValuesConfig, MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";
import {handleMutationCallback} from "@/common/_feat/handle-mutation-callback";
import {handleFormSubmitError} from "@/common/_feat/error-handling";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";

/** Configuration options required to instantiate the form container factory. */
type FactoryConfig<
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TEditEntity = unknown,
    TReturns = void,
    TMutConfig = void
> = {
    formName: string;
    useSubmitForm: (config?: FormValuesConfig<TFormValues, TEditEntity>) => UseFormReturn<TFormValues, unknown, TForm>;
    mutation: (params: TMutConfig) => UseMutationResult<TReturns, unknown, TForm>;
};

/** Props for the generated SubmitForm container component. */
export type FactoryFormContainerProps<
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TEditEntity = unknown,
    TReturns = void,
    TMutConfig = void,
> = MutationResponseConfig<TReturns, TForm> & MutationFormResetConfig & FormValuesConfig<TFormValues, TEditEntity> & {
    children: ReactNode;
} & (TMutConfig extends void ? { mutConfig?: never } : { mutConfig: TMutConfig });

/**
 * Creates a specialised form container component that encapsulates form provider setup, layout context, and async mutation handling.
 */
export function createFormContainer<
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TEditEntity = unknown,
    TReturns = void,
    TMutConfig = void,
>(
    {formName, useSubmitForm, mutation}: FactoryConfig<TFormValues, TForm, TEditEntity, TReturns, TMutConfig>
): (props: FactoryFormContainerProps<TFormValues, TForm, TEditEntity, TReturns, TMutConfig>) => ReactElement {
    function SubmitForm(
        props: FactoryFormContainerProps<TFormValues, TForm, TEditEntity, TReturns, TMutConfig>
    ): ReactElement {
        const {children, presetValues, editEntity, mutConfig, ...submitConfig} = props;

        const formID = useGenerateFormID(formName);

        const form = useSubmitForm({presetValues, editEntity});
        const {mutateAsync, isPending, isError} = mutation(mutConfig as TMutConfig);

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
                        onSubmit={form.handleSubmit(
                            // Cast because TS can't verify proper type
                            submitData as Parameters<typeof form.handleSubmit>[0]
                        )}
                    >
                        {children}
                    </form>
                </Form>
            </BaseFormContextProvider>
        );
    }

    return SubmitForm;
}