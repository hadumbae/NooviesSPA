/**
 * @fileoverview Configuration and context types for standardized data submission forms.
 */

import {FieldValues} from "react-hook-form";
import {MutationResponseConfig} from "@/common/features/submit-data/mutationTypes.ts";
import {ReactNode} from "react";

/** Full configuration suite for generic form features. */
export type FormOptions<TFormValues extends FieldValues, TEntity = unknown> = {
    presetValues?: Partial<TFormValues>;
    resetOnSuccess?: boolean;
    resetOnError?: boolean;
    editEntity?: TEntity;
};

/** Standardized props for form container components. */
export type FormConfigProps<
    TFormValues extends FieldValues,
    TEntity = unknown,
    TReturn = void
> = FormOptions<TFormValues, TEntity> & MutationResponseConfig<TReturn> & {
    children: ReactNode;
    uniqueKey?: string;
};

/** Common props for presentational form components (Views). */
export type FormViewProps<TFormValues extends FieldValues> = {
    children?: ReactNode;
    disableFields?: Partial<Record<keyof TFormValues, boolean>>;
    className?: string;
    isNestedView?: boolean;
};

/** Props for form fieldset components. */
export type FormFieldsetProps<TFormValues extends FieldValues> = {
    isNestedView?: boolean;
    disableFields?: Partial<Record<keyof TFormValues, boolean>>;
    className?: string;
};