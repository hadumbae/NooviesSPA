/**
 * @fileoverview Utility for synchronizing UI state closures with successful form submissions.
 */

import {Dispatch, SetStateAction} from "react";

/** Generic callback type for actions returning data. */
type ReturnAction<TReturn = void> = (data: TReturn) => void;

/** Configuration for the success closure handler. */
type CloserConfig<TReturn = void> = {
    setOpenState: Dispatch<SetStateAction<boolean>>;
    onSubmitSuccess?: ReturnAction<TReturn>;
}

/**
 * Higher-order function that wraps a success callback to automatically close a UI component.
 */
export function closeOnSuccess<TReturn = void>(
    {onSubmitSuccess, setOpenState}: CloserConfig<TReturn>
): ReturnAction<TReturn> {
    return (data: TReturn) => {
        setOpenState(false);
        onSubmitSuccess?.(data);
    };
}