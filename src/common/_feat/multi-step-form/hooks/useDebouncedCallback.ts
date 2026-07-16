/**
 * @fileoverview Custom hook for debouncing function calls.
 */

import {useCallback, useEffect, useRef} from "react";

/** Returns a debounced version of the provided callback that delays execution until after the timeout. */
export function useDebouncedCallback<TFunc extends (...args: any[]) => void>(
    callback: TFunc,
    timeout: number = 500,
): TFunc {
    const callbackRef = useRef<TFunc>(callback);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const callbackFunction = useCallback((...args: Parameters<TFunc>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => callbackRef.current(...args), timeout);
    }, [timeout]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
    }, [timeout]);

    return callbackFunction as TFunc;
}
