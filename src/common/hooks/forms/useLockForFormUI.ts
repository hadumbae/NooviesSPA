/**
 * @file Hook for managing a temporary UI lock around form mutations.
 * @filename useLockForFormUI.ts
 */

import { Dispatch, SetStateAction, useEffect, useState } from "react";

/**
 * Signals describing UI visibility and mutation state.
 * Used to determine when the UI should be locked or released.
 */
type UIProps = {
    isContentOpen: boolean;
    isMutationPending: boolean;
    isMutationError: boolean;
};

/**
 * State returned from the hook controlling the UI lock.
 */
type UILockReturns = {
    /** Whether interaction with the UI should currently be disabled. */
    isUILocked: boolean;
    /** Manual override for the UI lock state. */
    setIsUILocked: Dispatch<SetStateAction<boolean>>;
};

/**
 * Locks the UI while a mutation is pending and releases it on
 * mutation error or when the surrounding content closes.
 */
export function useLockForFormUI(
    { isContentOpen, isMutationPending, isMutationError }: UIProps
): UILockReturns {
    const [isUILocked, setIsUILocked] = useState<boolean>(false);

    useEffect(() => {
        if (isMutationPending) setIsUILocked(true);
        if (isMutationError) setIsUILocked(false);
    }, [isMutationPending, isMutationError]);

    useEffect(() => {
        if (!isContentOpen) setIsUILocked(false);
    }, [isContentOpen]);

    return {
        isUILocked,
        setIsUILocked,
    };
}