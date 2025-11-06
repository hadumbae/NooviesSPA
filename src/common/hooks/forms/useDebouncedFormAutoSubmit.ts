/**
 * @fileoverview Custom React hook that automatically submits a form
 * after its values change, with an adjustable debounce delay.
 *
 * Integrates seamlessly with React Hook Form to watch form values and
 * invoke the provided submit handler only after changes have stopped
 * for a specified duration.
 */

import { useEffect, useRef } from "react";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

/**
 * Parameters accepted by {@link useDebouncedFormAutoSubmit}.
 */
type DebouncedParams<TFormValues extends FieldValues> = {
    /**
     * The React Hook Form instance returned by `useForm`.
     */
    form: UseFormReturn<TFormValues>;

    /**
     * The submit handler to be called after the debounce delay
     * once form values have changed.
     */
    submitHandler: SubmitHandler<TFormValues>;

    /**
     * Optional debounce delay in milliseconds (default: `450`).
     */
    timeout?: number;
};

/**
 * React hook for automatically submitting a form when its values change,
 * debounced by a configurable delay.
 *
 * Watches the form values and calls `submitHandler` only after
 * no further changes occur within the given timeout.
 *
 * @template TFormValues - The form's field values type (extends `FieldValues`).
 *
 * @param {DebouncedParams<TFormValues>} params - Configuration object including form, handler, and timeout.
 * @returns {void} No return value; side effects occur through the provided `submitHandler`.
 *
 * @example
 * ```tsx
 * const form = useForm<MyFormValues>();
 *
 * useDebouncedFormAutoSubmit({
 *   form,
 *   submitHandler: (values) => console.log("Auto-submitted:", values),
 *   timeout: 600,
 * });
 * ```
 *
 * @remarks
 * - Clears and resets the debounce timer on every change.
 * - Ensures submissions only occur after a pause in user input.
 * - Ideal for search filters, query forms, and autosave forms.
 */
export default function useDebouncedFormAutoSubmit<TFormValues extends FieldValues>(
    params: DebouncedParams<TFormValues>
): void {
    const { form, submitHandler, timeout = 450 } = params;

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const prevValuesRef = useRef(form.getValues());
    const values = form.watch();

    useEffect(() => {
        const prevValues = prevValuesRef.current;

        if (JSON.stringify(prevValues) !== JSON.stringify(values)) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                submitHandler(values);
                prevValuesRef.current = values;
            }, timeout);
        }
    }, [values, submitHandler]);
}
