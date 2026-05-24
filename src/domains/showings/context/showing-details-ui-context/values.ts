/**
 * @fileoverview Defines the state and setter types for the showing details UI context.
 */

import {Dispatch, SetStateAction} from "react";

/** State values for the showing details UI context. */
export type ShowingDetailsUIStateContextValues = {
    isDeleting: boolean;
};

/** Setter functions for the showing details UI context. */
export type ShowingDetailsUISetterContextValues = {
    setIsDeleting: Dispatch<SetStateAction<boolean>>;
};