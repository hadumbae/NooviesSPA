/**
 * @file SeatFormContextProvider.tsx
 * @description
 * React provider for managing seat-form state during create/update workflows.
 *
 * Exposes a shared state container for:
 * - `initialValues`: baseline form values (defaults or server-loaded)
 * - `currentValues`: actively edited values
 * - `returnedSeats`: seats returned by the server after submission
 * - `options`: optional configuration controlling form behavior
 *
 * Components wrapped by this provider can access and modify shared state
 * using {@link SeatFormContext}.
 */

import { ReactNode, useState } from "react";
import { SeatFormValues } from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import { SeatFormContext } from "@/pages/seats/context/form/SeatFormContext.ts";
import { SeatDetails } from "@/pages/seats/schema/seat/SeatDetails.types.ts";
import { FormOptions } from "@/common/type/form/HookFormProps.ts";
import { SeatForm } from "@/pages/seats/schema/form/SeatForm.types.ts";

type ProviderProps = FormOptions<SeatFormValues, SeatForm> & {
    children: ReactNode;
};

/**
 * Provides a {@link SeatFormContext} instance to all child components.
 *
 * Manages the full lifecycle of a seat form:
 * - initial load (`initialValues`)
 * - user editing (`currentValues`)
 * - server responses (`returnedSeats`)
 * - behavior configuration (`options`)
 *
 * @param props - Includes React children and optional form configuration.
 * @returns A context provider exposing synchronized seat-form state.
 *
 * @example
 * ```tsx
 * <SeatFormContextProvider>
 *   <SeatForm />
 * </SeatFormContextProvider>
 * ```
 */
const SeatFormContextProvider = (props: ProviderProps) => {
    // --- Props ---
    const { children, ...options } = props;

    // --- State ---
    const [initialValues, setInitialValues] = useState<SeatFormValues | undefined>(undefined);
    const [currentValues, setCurrentValues] = useState<SeatFormValues | undefined>(undefined);
    const [returnedSeats, setReturnedSeats] = useState<SeatDetails[]>([]);

    // --- Aggregated Context Value ---
    const values = {
        initialValues,
        setInitialValues,
        currentValues,
        setCurrentValues,
        returnedSeats,
        setReturnedSeats,
        options,
    };

    // --- Render ---
    return (
        <SeatFormContext.Provider value={values}>
            {children}
        </SeatFormContext.Provider>
    );
};

export default SeatFormContextProvider;
