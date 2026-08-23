/**
 * @fileoverview Higher-order form factory providing schema validation, mutation management, and contextual form wrapper components.
 */

import {ReactElement} from "react";
import {ZodType, ZodTypeDef} from "zod";
import {FieldValues, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {FormValuesConfig} from "@/common/_feat/submit-data/formTypes.ts";
import {createFormHook} from "@/common/_feat/forms/createFormHook.tsx";
import {createFormContainer, FactoryFormContainerProps} from "@/common/_feat/forms/create-form/createFormContainer.tsx";

/** Configuration options required to instantiate the form factory. */
type FactoryConfig<
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TReturns = void,
    TMutConfig = void,
> = {
    formName: string;
    schema: ZodType<TForm, ZodTypeDef, unknown>;
    defaultValues: TFormValues;
    mutation: (params: TMutConfig) => UseMutationResult<TReturns, unknown, TForm>;
};

/** The generated hook and component returned by the form factory. */
type FactoryReturns<
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TEditEntity = unknown,
    TReturns = void,
    TMutConfig = void,
> = {
    useSubmitForm: (config?: FormValuesConfig<TFormValues, TEditEntity>) => UseFormReturn<TFormValues, unknown, TForm>;
    SubmitForm: (props: FactoryFormContainerProps<TFormValues, TForm, TEditEntity, TReturns, TMutConfig>) => ReactElement;
};

/**
 * Creates a reactive form ecosystem comprising a validation state hook and an automated submission container component.
 */
export function createForm<
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TEditEntity = unknown,
    TReturns = void,
    TMutConfig = void,
>(
    {formName, schema, defaultValues, mutation}: FactoryConfig<TFormValues, TForm, TReturns, TMutConfig>
): FactoryReturns<TFormValues, TForm, TEditEntity, TReturns, TMutConfig> {
    const useSubmitForm = createFormHook<TFormValues, TForm, TEditEntity>({schema, defaultValues});
    const SubmitForm = createFormContainer<TFormValues, TForm, TEditEntity, TReturns, TMutConfig>({
        useSubmitForm,
        formName,
        mutation,
    });

    return {
        useSubmitForm,
        SubmitForm,
    };
}