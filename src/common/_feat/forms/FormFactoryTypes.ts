/**
 * @fileoverview Type definitions for multi-step form container factory configuration and mutation parameters.
 */

import {FieldValues, UseFormReturn} from "react-hook-form";
import {FormValuesConfig} from "@/common/_feat";
import {UseMutationResult} from "@tanstack/react-query";

/** Configuration options for creating form container factories. */
export type FormContainerFactoryConfig<
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

/** Conditional mutation parameters configuration for form containers. */
export type FormMutationConfig<TMutConfig = void> = (
    TMutConfig extends void
        ? { mutConfig?: never }
        : { mutConfig: TMutConfig }
    );