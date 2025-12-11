import {Context, useEffect} from "react";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
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
    /** The React Hook Form instance controlling the form. */
    form: UseFormReturn<TFormValues>;

    /**
     * The form context that stores `currentValues` and its setter.
     * Must match the corresponding provider used above in the component tree.
     */
    context: Context<FormContextValues<TFormValues, TForm, TEntity> | undefined>;
};

/**
 * Synchronizes a form's active values with a {@link FormContextValues} provider.
 *
 * Behavior:
 * - Resets the form to the context’s `currentValues` when mounted.
 * - Subscribes to form changes and updates the context.
 * - Uses a debounced setter to prevent excessive update calls during typing.
 *
 * Useful when shared UI regions need continuous access to the form’s active state
 * or when preserving state while navigating between nested panels.
 *
 * @template TFormValues - Internal form value shape.
 * @template TForm - Optional submission payload type.
 * @template TEntity - Optional attached entity used for editing.
 *
 * @param params - The form instance and its associated context.
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
    const {currentValues, setCurrentValues} = useRequiredContext({context});
    const {reset} = form;

    // Debounced setter to limit update frequency
    const debounceSet = useDebouncedCallback(setCurrentValues, 500);

    // Reset on mount for consistent initial state
    useEffect(() => {
        if (currentValues) {
            reset(currentValues);
        }
    }, [reset]);

    // Subscribe to form changes and propagate them
    useEffect(() => {
        const subscription = form.watch((newValues) =>
            debounceSet(newValues as TFormValues)
        );

        return () => subscription.unsubscribe();
    }, [form, debounceSet]);
}
