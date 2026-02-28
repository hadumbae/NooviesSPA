/**
 * @file View-layer contracts for form rendering state and options.
 * FormViewProps.ts
 */

import {FieldValues} from "react-hook-form";

/**
 * Mutation lifecycle state exposed to form view components.
 */
export type FormViewMutationStates = {
    isSuccess?: boolean;
    isPending?: boolean;
    isError?: boolean;
    error?: unknown;
    reset?: () => void;
};

/**
 * Runtime options affecting form presentation and interaction.
 */
export type FormViewOptions<TFormValues extends FieldValues> = {
    /** Field keys to disable in the UI. */
    disableFields?: (keyof TFormValues)[];

    /** Indicates rendering within a panel layout. */
    isPanel?: boolean;

    /** Indicates the form is in edit mode. */
    isEditing?: boolean;
}