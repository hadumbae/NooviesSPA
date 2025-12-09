/**
 * @file SeatFormContext.ts
 * @description
 * React context for managing seat-form creation and editing workflows.
 *
 * Centralizes form lifecycle state:
 * - `initialValues`: defaults or server-loaded values
 * - `currentValues`: actively edited state
 * - `returnedSeats`: server results after submission
 * - setter functions for controlled updates
 *
 * Intended to be provided at a workflow or panel level so multiple components
 * can access and update shared seat-form state.
 */

import { createContext, Dispatch, SetStateAction } from "react";
import { SeatFormValues } from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import { SeatDetails } from "@/pages/seats/schema/seat/SeatDetails.types.ts";
import { FormOptions } from "@/common/type/form/HookFormProps.ts";
import { SeatForm } from "@/pages/seats/schema/form/SeatForm.types.ts";

/**
 * Shape of the values stored within {@link SeatFormContext}.
 *
 * Tracks the full lifecycle of a seat form:
 * - `initialValues`: starting state (defaults or server data)
 * - `currentValues`: actively edited state
 * - `returnedSeats`: server-returned items after submit
 */
export type SeatFormContextValues = {
    /**
     * Initial form values.
     * Loaded from the server for edit mode or defaults for create mode.
     */
    initialValues: SeatFormValues | undefined;

    /** Setter for updating `initialValues`. */
    setInitialValues: Dispatch<SetStateAction<SeatFormValues | undefined>>;

    /**
     * Current, actively edited form values.
     * May be undefined before initialization.
     */
    currentValues: SeatFormValues | undefined;

    /** Setter for updating `currentValues`. */
    setCurrentValues: Dispatch<SetStateAction<SeatFormValues | undefined>>;

    /**
     * Seats returned after a successful server submission.
     * Empty array when no data has been returned or after reset.
     */
    returnedSeats: SeatDetails[];

    /** Setter for updating `returnedSeats`. */
    setReturnedSeats: Dispatch<SetStateAction<SeatDetails[]>>;

    /**
     * Optional configuration controlling form behavior,
     * such as disabled fields, preset values, and reset logic.
     */
    options?: FormOptions<SeatFormValues, SeatForm>;
};

/**
 * React context containing {@link SeatFormContextValues}.
 *
 * Components consuming this context must be wrapped in the provider.
 * A value of `undefined` indicates misuse outside of the provider boundary.
 */
export const SeatFormContext = createContext<SeatFormContextValues | undefined>(undefined);
