/**
 * @fileoverview Hook for capturing and persisting the initial default values of a react-hook-form instance.
 */

import { useEffect, useRef } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

/** Parameters for the useFormInitialValues hook. */
type ValueParams<TValues extends FieldValues, TForm extends FieldValues = TValues> = {
    form: UseFormReturn<TValues, unknown, TForm>;
};

/**
 * Captures the initial default values from a form state and preserves them across re-renders.
 */
export function useFormInitialValues<TValues extends FieldValues, TForm extends FieldValues = TValues>(
    {form}: ValueParams<TValues, TForm>
): TValues | null {
    const initialValues = useRef<TValues | null>(null);

    useEffect(() => {
        if (initialValues.current === null && form.formState.defaultValues) {
            initialValues.current = form.formState.defaultValues as TValues;
        }
    }, [form.formState.defaultValues]);

    return initialValues.current;
}
