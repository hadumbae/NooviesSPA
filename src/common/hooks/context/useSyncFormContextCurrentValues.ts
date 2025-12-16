/**
 * @file useSyncFormContextCurrentValues.ts
 * @summary
 * Hook for keeping React Hook Form values synchronized with a shared form context.
 *
 * This hook bridges a controlled form instance and a {@link FormContextValues}
 * provider, ensuring that the form’s active state is continuously reflected
 * in context while avoiding excessive updates.
 */

import {Context, useContext, useEffect} from "react";
import {FormContextValues} from "@/common/type/context/FormContextValues.ts";
import {FieldValues, UseFormReturn} from "react-hook-form";
import useDebouncedCallback from "@/common/hooks/useDebouncedCallback.tsx";

/**
 * Parameters for {@link useSyncFormContextCurrentValues}.
 *
 * @template TFormValues - Values managed by React Hook Form.
 * @template TForm - Optional transformed submission payload. Defaults to `TFormValues`.
 * @template TEntity - Optional entity used for edit-by-entity workflows.
 */
type ContextParams<
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TEntity = unknown,
> = {
    /**
     * The React Hook Form instance controlling the form.
     */
    form: UseFormReturn<TFormValues>;

    /**
     * Form context storing `currentValues` and its setter.
     *
     * Must correspond to the provider mounted higher in the tree.
     */
    context: Context<FormContextValues<TFormValues, TForm, TEntity> | undefined>;
};

/**
 * Synchronizes a form’s active values with a form context provider.
 *
 * ### Behavior
 * - On mount, resets the form to the context’s `currentValues` (if present)
 * - Subscribes to form value changes and propagates them to context
 * - Debounces updates to reduce render and state churn during typing
 * - Cleans up subscriptions automatically on unmount
 *
 * This is especially useful for:
 * - Multi-panel or wizard-style UIs
 * - Preserving form state across navigations
 * - Allowing sibling components to react to live form changes
 *
 * @template TFormValues - Internal form value shape.
 * @template TForm - Optional submission payload type.
 * @template TEntity - Optional attached entity used for editing.
 *
 * @param params The form instance and its associated context.
 * @returns void
 *
 * @example
 * ```ts
 * useSyncFormContextCurrentValues({
 *   form,
 *   context: ScreenFormContext,
 * });
 * ```
 */
export default function useSyncFormContextCurrentValues<
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TEntity = unknown
>(params: ContextParams<TFormValues, TForm, TEntity>): void {
    const {form, context} = params;
    const contextValues = useContext(context);
    const {reset} = form;

    // --- Exit If No Context ---
    if (!contextValues) {
        return;
    }

    const {currentValues, setCurrentValues} = contextValues;

    // --- Debounced Setter ---
    const debounceSet = useDebouncedCallback(setCurrentValues, 500);

    // --- Sync Values On Render ---
    useEffect(() => {
        if (currentValues) {
            reset(currentValues);
        }
    }, [reset]);

    // --- Update Context Values ---
    useEffect(() => {
        const subscription = form.watch((newValues) => {
            debounceSet(newValues as TFormValues);
        });

        return () => subscription.unsubscribe();
    }, [form, debounceSet]);
}
