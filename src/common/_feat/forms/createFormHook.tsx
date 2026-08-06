/**
 * @fileoverview React hook factory for generating specialised, schema-validated forms with reactive default values.
 */

import {useRef} from "react";
import {isEqual} from "lodash";
import {ZodType, ZodTypeDef} from "zod";
import {DefaultValues, FieldValues, useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormValuesConfig} from "@/common/_feat/submit-data";

/** Configuration parameters required by the form hook factory. */
type FactoryConfig<TFormValues extends FieldValues, TForm extends FieldValues = TFormValues> = {
    schema: ZodType<TForm, ZodTypeDef, unknown>;
    defaultValues: TFormValues;
};

/**
 * Creates a custom React hook tailored for managing form state with Zod validation and dynamic initialization.
 */
export function createFormHook<
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TEntity = unknown,
>(
    {schema, defaultValues}: FactoryConfig<TFormValues, TForm>
): (config?: FormValuesConfig<TFormValues, TEntity>) => UseFormReturn<TFormValues, unknown, TForm> {
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
        {presetValues, editEntity}: FormValuesConfig<TFormValues, TEntity> = {}
    ): UseFormReturn<TFormValues, unknown, TForm> {
        const defaultValues = useDefaultValues({presetValues, editEntity});

        return useForm<TFormValues, unknown, TForm>({
            resolver: zodResolver(schema),
            defaultValues: defaultValues as DefaultValues<TFormValues>,
        });
    }

    return useSubmitForm;
}