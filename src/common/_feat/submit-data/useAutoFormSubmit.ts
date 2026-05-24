/**
 * @fileoverview Hook for automatically submitting a form on value changes with debouncing.
 * Synchronizes form state with external handlers (e.g., URL filters) without manual submission.
 */

import {useEffect, useRef} from "react";
import {FieldValues, SubmitHandler, useFormContext} from "react-hook-form";

/** Configuration for the {@link useAutoFormSubmit} hook. */
type DebouncedParams<TForm extends FieldValues> = {
    /** The handler to be executed when the form is automatically submitted. */
    submitHandler: SubmitHandler<TForm>;
    /** The delay in milliseconds to wait after the last change before submitting. Defaults to 450. */
    timeout?: number;
};

/**
 * Monitors form values and triggers a debounced submission when changes are detected.
 */
export function useAutoFormSubmit<TForm extends FieldValues>(
    {submitHandler, timeout = 450}: DebouncedParams<TForm>
): void {
    const {watch, getValues, handleSubmit} = useFormContext<TForm>();

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const prevValuesRef = useRef<TForm>(getValues());
    const values = watch();

    useEffect(() => {
        const prevValues = prevValuesRef.current;

        if (JSON.stringify(prevValues) === JSON.stringify(values)) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            handleSubmit(submitHandler)();
            prevValuesRef.current = values;
        }, timeout);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [values, submitHandler, timeout, handleSubmit]);
}