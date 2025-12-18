/**
 * @file useFormInitialValues.ts
 *
 * React hook for capturing and preserving a form’s initial default values.
 *
 * This hook stores the first resolved `defaultValues` from a `react-hook-form`
 * instance in a stable ref. The captured values persist across re-renders and
 * are not updated on subsequent default value changes.
 *
 * Common use cases:
 * - Resetting a form back to its original state
 * - Comparing current form values against the initial snapshot
 * - Supporting multi-step or persisted form flows
 *
 * @template TValues - Shape of form values managed by `react-hook-form`.
 */

import { MutableRefObject, useEffect, useRef } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

/**
 * Parameters for {@link useFormInitialValues}.
 *
 * @template TValues - Shape of form values.
 *
 * @property form - `react-hook-form` instance whose initial default values
 *                  should be captured.
 */
type ValueParams<TValues extends FieldValues> = {
    form: UseFormReturn<TValues>;
};

/**
 * Captures the initial `defaultValues` of a `react-hook-form` instance.
 *
 * The values are stored once—when `defaultValues` first become available—and
 * are preserved for the lifetime of the component.
 *
 * @template TValues - Shape of form values.
 *
 * @param params - Hook parameters.
 * @returns A mutable ref containing the initial form values, or `null`
 *          if defaults have not yet been resolved.
 *
 * @example
 * ```ts
 * const initialValuesRef = useFormInitialValues({ form });
 *
 * // Reset to initial values
 * form.reset(initialValuesRef.current ?? undefined);
 * ```
 */
export default function useFormInitialValues<TValues extends FieldValues>(
    { form }: ValueParams<TValues>
): MutableRefObject<TValues | null> {
    const initialValues = useRef<TValues | null>(null);

    useEffect(() => {
        if (initialValues.current === null && form.formState.defaultValues) {
            initialValues.current = form.formState.defaultValues as TValues;
        }
    }, [form.formState.defaultValues]);

    return initialValues;
}
