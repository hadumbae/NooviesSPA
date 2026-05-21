/**
 * @fileoverview Provides the base context and types for multi-step form state management.
 */

import {createContext} from "react";
import {FieldValues, SubmitHandler} from "react-hook-form";

/** Core values for the multi-step form context. */
export type BaseMultiStepFormContextValues<TForm extends FieldValues = any> = {
    formID: string;
    isPending?: boolean;
    localStorageKey: string;
    submitHandler?: SubmitHandler<TForm>;
};

/** Context for sharing multi-step form state and submission handlers. */
export const BaseMultiStepFormContext = createContext<BaseMultiStepFormContextValues | undefined>(undefined);