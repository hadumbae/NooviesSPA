/**
 * @fileoverview Defines the React context and state types for managing multi-step form progress and data.
 */

import {FieldValues} from "react-hook-form";
import { createContext } from "react";
import {FormStepMeta} from "@/common/_feat/multi-step-form/types.ts";

/** Values provided by the multi-step form state context. */
export type MultiStepFormStateContextValues<TValues extends FieldValues = any> = {
  isHydrated: boolean;
  currentStepIndex: number;
  stepMeta: FormStepMeta<TValues>[];
};

/** Context for accessing the current state and configuration of a multi-step form. */
export const MultiStepFormStateContext = createContext<
  MultiStepFormStateContextValues | undefined
>(undefined);
