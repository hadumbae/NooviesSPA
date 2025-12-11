import {useCallback, useEffect, useRef} from "react";

/**
 * @file useDebouncedCallback.ts
 * @summary React hook to create a debounced version of a callback function.
 *
 * @description
 * This hook returns a debounced function that delays invoking the provided `callback`
 * until after `timeout` milliseconds have elapsed since the last time the debounced
 * function was called.
 *
 * Both the `callback` and the `timeout` are stored in `useRef` references:
 * - `callbackRef` ensures that the most recent callback is always called, preventing
 *   stale closures if the callback changes between renders.
 * - `timeoutRef` holds the active timeout ID so it can be cleared if the debounced
 *   function is called again before the timeout expires, or when the component unmounts.
 *
 * This ensures consistent, up-to-date debouncing behavior without unnecessary re-renders.
 *
 * @template TFunc - The type of the callback function.
 *
 * @param callback - The function to debounce.
 * @param timeout - Optional debounce delay in milliseconds (default: 500ms).
 *
 * @returns A debounced version of the provided callback function.
 *
 * @example
 * ```ts
 * const handleChange = useDebouncedCallback((value: string) => {
 *   console.log("Debounced value:", value);
 * }, 300);
 *
 * <input onChange={e => handleChange(e.target.value)} />
 * ```
 */
export default function useDebouncedCallback<TFunc extends (...args: any[]) => void>(
    callback: TFunc,
    timeout: number = 500,
): TFunc {
    // --- Callback And Timeout References ---
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

        timeoutRef.current = setTimeout(() => callbackRef.current(args), timeout);
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
