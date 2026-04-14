/**
 * @fileoverview Mutation configuration types for standardized feedback and form state.
 */

import {FieldValues, UseFormReturn} from "react-hook-form";

/** UI feedback and lifecycle callbacks. */
export type MutationResponseConfig<TReturn = void> = {
    successMessage?: string;
    onSubmitSuccess?: (data: TReturn) => void;
    errorMessage?: string;
    onSubmitError?: (error: unknown) => void;
};

/** Form reset triggers. */
export type MutationFormResetConfig = {
    onSubmit?: boolean;
    onSuccess?: boolean;
    onError?: boolean;
};

/** Form-based mutation integration. */
export type MutationFormConfig<TFormValues extends FieldValues> = {
    form?: UseFormReturn<TFormValues>;
    resetForm?: MutationFormResetConfig;
};