/**
 * @file SeatFormContext.ts
 *
 * Provides a React context for managing all state involved in seat-form
 * creation and editing workflows. This includes:
 *
 * - `initialValues`: values loaded from the server or preconfigured defaults
 * - `currentValues`: the actively edited seat-form state
 * - `returnedSeats`: seats returned by the server after submission
 * - setter functions for controlled updates to each state slice
 *
 * The context is typically provided at the page or workflow level so that
 * multiple components can read and modify shared seat-form data in a
 * synchronized manner.
 */

import {createContext, Dispatch, SetStateAction} from "react";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";

/**
 * Represents all state values stored within the {@link SeatFormContext}.
 *
 * Together, these values describe the lifecycle of a seat form:
 * - how it begins (`initialValues`)
 * - how it evolves (`currentValues`)
 * - what the server returns after submission (`returnedSeats`)
 */
export type SeatFormContextValues = {
    /**
     * The initial form values used when first rendering the form.
     * This may come from server-loaded data (edit mode) or defaults
     * (create mode). `undefined` means no initial values have been set.
     */
    initialValues: SeatFormValues | undefined;

    /**
     * Setter for updating {@link initialValues}. Typically used once when
     * initial data is loaded or when the form must be reset.
     */
    setInitialValues: Dispatch<SetStateAction<SeatFormValues | undefined>>;

    /**
     * The current, actively edited state of the form. This updates as
     * the user modifies seat-related inputs. `undefined` indicates the
     * form has not yet been initialized.
     */
    currentValues: SeatFormValues | undefined;

    /**
     * Setter for updating {@link currentValues}. Used to keep the form
     * state synchronized across consuming components.
     */
    setCurrentValues: Dispatch<SetStateAction<SeatFormValues | undefined>>;

    /**
     * The seats returned by the server after form submission.
     *
     * An empty array indicates that no submission response has been
     * received yet or that the previous result has been cleared.
     */
    returnedSeats: Seat[];

    /**
     * Setter for updating {@link returnedSeats}. Called after receiving
     * POST/PUT results, or to reset the submission-response state.
     */
    setReturnedSeats: Dispatch<SetStateAction<Seat[]>>;
};

/**
 * React context storing {@link SeatFormContextValues}.
 *
 * When consumed, this context enables components to participate in a shared,
 * synchronized seat-form workflow. If accessed while `undefined`, the consumer
 * is not wrapped in the corresponding provider.
 */
export const SeatFormContext = createContext<SeatFormContextValues | undefined>(undefined);
