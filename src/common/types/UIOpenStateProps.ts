/**
 * @fileoverview Type definition for managing common UI "open" states.
 */

import {Dispatch, SetStateAction} from "react";

/**
 * Standardized props for components that require an externalized open/closed state.
 */
export type UIOpenStateProps = {
    isOpen: boolean;

    setIsOpen: Dispatch<SetStateAction<boolean>>;
};