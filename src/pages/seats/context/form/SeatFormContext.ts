/**
 * @file SeatFormContext.ts
 * @description
 * Provides a React context for managing seat-form creation and editing workflows.
 *
 * This context centralizes state for:
 * - `initialValues`: loaded from server or default values
 * - `currentValues`: actively edited form state
 * - `returnedSeats`: server-returned seats after submission
 * - setter functions for controlled updates
 *
 * Typically provided at the page or workflow level so multiple components
 * can access and modify shared seat-form state in a synchronized manner.
 */

import { createContext, Dispatch, SetStateAction } from "react";
import { SeatFormValues } from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import { SeatDetails } from "@/pages/seats/schema/seat/SeatDetails.types.ts";

/**
 * Values stored within {@link SeatFormContext}.
 *
 * Represents the full lifecycle of a seat form:
 * 1. Initial state (`initialValues`)
 * 2. Actively edited state (`currentValues`)
 * 3. Server-returned results (`returnedSeats`)
 */
export type SeatFormContextValues = {
    /** Initial form values (server-loaded for edit mode or defaults for create mode). `undefined` if not set. */
    initialValues: SeatFormValues | undefined;

    /** Setter for updating {@link initialValues}. Typically used once on load or reset. */
    setInitialValues: Dispatch<SetStateAction<SeatFormValues | undefined>>;

    /** The current, actively edited form state. `undefined` if not initialized. */
    currentValues: SeatFormValues | undefined;

    /** Setter for updating {@link currentValues}. Keeps state synchronized across components. */
    setCurrentValues: Dispatch<SetStateAction<SeatFormValues | undefined>>;

    /** Seats returned by the server after submission. Empty array if no response yet or cleared. */
    returnedSeats: SeatDetails[];

    /** Setter for updating {@link returnedSeats}. Called after POST/PUT results or to reset state. */
    setReturnedSeats: Dispatch<SetStateAction<SeatDetails[]>>;
};

/**
 * React context providing {@link SeatFormContextValues}.
 *
 * Enables components to participate in a shared, synchronized seat-form workflow.
 * If consumed while `undefined`, the component is not wrapped in the provider.
 */
export const SeatFormContext = createContext<SeatFormContextValues | undefined>(undefined);
