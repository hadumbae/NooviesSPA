/**
 * @fileoverview Higher-order factory function for creating reusable form container components integrated with React Hook Form and TanStack Query mutations.
 */

import {ReactElement, ReactNode} from "react";
import {DefaultValues, FieldValues} from "react-hook-form";
import {Form} from "@/views/common/_comp/ui";
import {FormValuesConfig, MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data";
import {useGenerateFormID} from "@/common/_feat/generate-form-keys";
import {BaseFormContextProvider} from "@/common/_feat/generic-form-context";
import {createFormSubmitHandler} from "@/common/_feat/forms/createFormSubmitHandler.ts";
import {FormContainerFactoryConfig} from "@/common/_feat/forms/FormFactoryTypes.ts";

/** Props for the generated SubmitForm container component. */
export type FactoryFormContainerProps<
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TEditEntity = unknown,
    TReturns = void,
    TMutConfig = void,
> = MutationResponseConfig<TReturns, TForm> & MutationFormResetConfig & FormValuesConfig<TFormValues, TEditEntity> & {
    resetValues?: DefaultValues<TFormValues>;
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
    params: FormContainerFactoryConfig<TFormValues, TForm, TEditEntity, TReturns, TMutConfig>
): (props: FactoryFormContainerProps<TFormValues, TForm, TEditEntity, TReturns, TMutConfig>) => ReactElement {
    const {formName, useSubmitForm, mutation} = params;

    function SubmitForm(
        props: FactoryFormContainerProps<TFormValues, TForm, TEditEntity, TReturns, TMutConfig>
    ): ReactElement {
        const {children, presetValues, editEntity, mutConfig, resetValues, ...submitConfig} = props;

        const formID = useGenerateFormID(formName);

        const form = useSubmitForm({presetValues, editEntity});
        const {mutateAsync, isPending, isError} = mutation(mutConfig as TMutConfig);

        const {formState: {errors}, getValues} = form
        if (Object.keys(errors).length > 0) {
            console.debug("Form Values:", getValues());
            console.debug("Form Errors:", errors);
        }

        const submitData = createFormSubmitHandler({
            form,
            mutateAsync,
            resetValues,
            ...submitConfig,
        });

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