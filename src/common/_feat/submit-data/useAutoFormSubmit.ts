/**
 * @fileoverview Hook for automatically submitting a form on value changes with debouncing.
 */

import {useEffect, useRef} from "react";
import {FieldValues, SubmitHandler, useFormContext} from "react-hook-form";

/** Configuration for the useAutoFormSubmit hook. */
type DebouncedParams<TForm extends FieldValues> = {
    submitHandler: SubmitHandler<TForm>;
    timeout?: number;
};

/**
 * Triggers a debounced form submission when field values change.
 * Requires wrapping in a FormProvider.
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