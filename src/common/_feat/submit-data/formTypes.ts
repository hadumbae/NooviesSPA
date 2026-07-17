/**
 * @fileoverview Type definitions for standardized data submission forms and their configurations.
 *
 */

import {FieldValues} from "react-hook-form";
import {MutationFormResetConfig, MutationResponseConfig} from "@/common/_feat/submit-data/mutationTypes.ts";
import {ReactNode} from "react";
import {DisableFields} from "@/common/_types";


/** Configuration for initial form values and entity data. */
export type FormValuesConfig<TFormValues extends FieldValues, TEntity = unknown> = {
    presetValues?: Partial<TFormValues>;
    editEntity?: TEntity;
}

/** Configuration options for generic form features. */
export type FormOptions<TFormValues extends FieldValues, TEntity = unknown> =
    MutationFormResetConfig & FormValuesConfig<TFormValues, TEntity>;

/** Props for the FormConfig component. */
export type FormConfigProps<
    TFormValues extends FieldValues,
    TEntity = unknown,
    TReturn = void
> = FormOptions<TFormValues, TEntity> & MutationResponseConfig<TReturn> & {
    children: ReactNode;
    uniqueKey?: string;
};

/** Configuration for form containers managing submission and reset logic. */
export type FormContainerConfigProps<TFormValues extends FieldValues, TEntity, TForm extends FieldValues = TFormValues, TReturn = void> = {
    formConfig?: FormValuesConfig<TFormValues, TEntity>;
    resetConfig?: MutationFormResetConfig;
    onSubmitConfig?: MutationResponseConfig<TReturn, TForm>;
};

/** Props for the FormView component. */
export type FormViewProps<TFormValues extends FieldValues> = {
    children?: ReactNode;
    disableFields?: Partial<Record<keyof TFormValues, boolean>>;
    className?: string;
    isNestedView?: boolean;
};

/** Props for form fieldset components. */
export type FormFieldsetProps<TFormValues extends FieldValues> = {
    isNestedView?: boolean;
    disableFields?: DisableFields<TFormValues>;
    className?: string;
};