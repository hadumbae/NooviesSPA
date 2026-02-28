/**
 * @file Shared view-layer contracts for form rendering.
 * FormViewProps.ts
 */

import {FieldValues} from "react-hook-form";

/**
 * Mutation state exposed to form view components.
 */
export type FormViewMutationStates = {
    isSuccess?: boolean;
    isPending?: boolean;
    isError?: boolean;
    error?: unknown;
    reset?: () => void;
};

/**
 * Runtime configuration influencing form view behaviour.
 */
export type FormViewOptions<TFormValues extends FieldValues> = {
    /** Field keys to disable in the UI. */
    disableFields?: (keyof TFormValues)[];

    /** Indicates the form is rendered within a panel layout. */
    isPanel?: boolean;
}