/**
 * @fileoverview Provides the base context and types for multi-step form state management.
 */

import {createContext} from "react";
import {FieldValues, SubmitHandler} from "react-hook-form";
import {StorageType} from "@/common/types/browser-storage";

/** Core values for the multi-step form context. */
export type BaseMultiStepFormContextValues<TForm extends FieldValues = any> = {
    formID: string;
    localStorageKey: string;
    isPending?: boolean;
    submitHandler?: SubmitHandler<TForm>;
    useStorage?: boolean;
    storageType?: StorageType;
};

/** Context for sharing multi-step form state and submission handlers. */
export const BaseMultiStepFormContext = createContext<BaseMultiStepFormContextValues | undefined>(undefined);