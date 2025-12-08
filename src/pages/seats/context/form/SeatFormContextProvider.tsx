/**
 * @file SeatFormContextProvider.tsx
 * @description
 * Provides a React Context Provider for managing seat-form state during
 * create/update workflows.
 *
 * The provider maintains synchronized state for:
 * - `initialValues`: baseline form values (from server or defaults)
 * - `currentValues`: actively edited form values
 * - `returnedSeats`: seats returned by the server after submission
 * - setter functions for controlled updates
 *
 * Components wrapped by this provider can consume the state via {@link SeatFormContext}.
 */

import { FC, PropsWithChildren, useState } from "react";
import { SeatFormValues } from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import { SeatFormContext } from "@/pages/seats/context/form/SeatFormContext.ts";
import { SeatDetails } from "@/pages/seats/schema/seat/SeatDetails.types.ts";

/**
 * `SeatFormContextProvider`
 *
 * Wraps children in a context that exposes the full lifecycle state of a seat form.
 *
 * ⚡ State managed internally:
 * - **initialValues** — baseline values (usually loaded once)
 * - **currentValues** — live user-edited values
 * - **returnedSeats** — seats returned after form submission (empty array if none)
 *
 * @param children React children to render inside the provider
 *
 * @returns Context provider exposing synchronized seat-form state
 *
 * @example
 * ```tsx
 * <SeatFormContextProvider>
 *   <SeatForm />
 * </SeatFormContextProvider>
 * ```
 */
const SeatFormContextProvider: FC<PropsWithChildren> = ({ children }) => {
    // ⚡ State ⚡
    const [initialValues, setInitialValues] = useState<SeatFormValues | undefined>(undefined);
    const [currentValues, setCurrentValues] = useState<SeatFormValues | undefined>(undefined);
    const [returnedSeats, setReturnedSeats] = useState<SeatDetails[]>([]);

    // ⚡ Values ⚡
    const values = {
        initialValues,
        setInitialValues,
        currentValues,
        setCurrentValues,
        returnedSeats,
        setReturnedSeats,
    };

    // ⚡ Render ⚡
    return (
        <SeatFormContext.Provider value={values}>
            {children}
        </SeatFormContext.Provider>
    );
};

export default SeatFormContextProvider;
