/**
 * @fileoverview Hook for managing UI lock states during form mutations and visibility changes.
 */

import { Dispatch, SetStateAction, useEffect, useState } from "react";

/** Props for the useLockForFormUI hook. */
type UIProps = {
    isContentOpen?: boolean;
    isMutationPending?: boolean;
    isMutationError?: boolean;
};

/** Return values for the useLockForFormUI hook. */
type UILockReturns = {
    isUILocked: boolean;
    setIsUILocked: Dispatch<SetStateAction<boolean>>;
};

/** Manages a boolean lock state based on mutation status and content visibility. */
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