import {useCallback, useEffect, useRef} from "react";

/**
 * @fileoverview Custom hook for debouncing function calls.
 *
 */

/** Returns a debounced version of the provided callback that delays execution until after the timeout. */
export function useDebouncedCallback<TFunc extends (...args: any[]) => void>(
    callback: TFunc,
    timeout: number = 500,
): TFunc {
    const callbackRef = useRef<TFunc>(callback);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // --- Update Reference To Prevent Stale Callbacks ---

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    // --- Debounced Function ---

    const callbackFunction = useCallback((...args: Parameters<TFunc>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => callbackRef.current(...args), timeout);
    }, [timeout]);

    // --- Clear Out Timer On Unmount ---

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
    }, [timeout]);

    return callbackFunction as TFunc;
}
