/**
 * @fileoverview Hook for generating unique, deterministic form element identifiers.
 */

import {useId} from "react";

/** Generates a unique ID string prefixed with a provided stub for accessibility and form linking. */
export function useGenerateFormID(idStub: string): string {
    const id = useId();
    return `${idStub}-${id}`
}