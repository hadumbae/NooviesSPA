/**
 * @file SeatFormContextProvider.tsx
 *
 * Provides a React Context Provider that manages all seat-form state for
 * create/update operations. This includes:
 *
 * - `initialValues`: values loaded from the server or defaults
 * - `currentValues`: values actively modified during user input
 * - `returnedSeats`: the seats returned by the server after submission
 * - setter functions for controlled updates to each state slice
 *
 * Components wrapped by this provider can consume synchronized seat-form state
 * through the {@link SeatFormContext}.
 */

import {FC, PropsWithChildren, useState} from 'react';
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import {SeatFormContext} from "@/pages/seats/context/form/SeatFormContext.ts";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";

/**
 * SeatFormContextProvider
 *
 * Wraps child components in a context that supplies the full lifecycle state
 * for a seat form: the initial values, the actively edited values, and the
 * server-returned seats after submission.
 *
 * Internally, the provider maintains three independent pieces of state:
 *
 * - **initialValues** — the baseline form values (usually loaded once)
 * - **currentValues** — the live, user-edited form values
 * - **returnedSeats** — the array of seats returned after form submission
 *
 * `returnedSeats` is always an array; an empty array indicates that no
 * submission result has been received yet or that results were reset.
 *
 * @param props - React children to be rendered inside the provider.
 *
 * @returns A context provider exposing synchronized seat-form state to all
 * descendants.
 *
 * @example
 * ```tsx
 * <SeatFormContextProvider>
 *   <SeatForm />
 * </SeatFormContextProvider>
 * ```
 */
const SeatFormContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [initialValues, setInitialValues] = useState<SeatFormValues | undefined>(undefined);
    const [currentValues, setCurrentValues] = useState<SeatFormValues | undefined>(undefined);
    const [returnedSeats, setReturnedSeats] = useState<Seat[]>([]);

    const values = {
        initialValues,
        setInitialValues,
        currentValues,
        setCurrentValues,
        returnedSeats,
        setReturnedSeats,
    };

    return (
        <SeatFormContext.Provider value={values}>
            {children}
        </SeatFormContext.Provider>
    );
};

export default SeatFormContextProvider;
