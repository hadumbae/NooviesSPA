/**
 * @fileoverview React provider for managing seat-form state during create and update workflows.
 */

import { ReactNode, useState } from "react";
import { SeatFormValues } from "@/domains/seats/_feat/submit-data/schemas/SeatFormValuesSchema.ts";
import { SeatFormContext } from "@/domains/seats/context/form/SeatFormContext.ts";
import { SeatDetails } from "@/domains/seats/schema/seat/SeatDetails.types.ts";
import { FormOptions } from "@/common/type/form/HookFormProps.ts";
import {SeatForm} from "@/domains/seats/_feat/submit-data/schemas/SeatFormSchema.ts";

/** Props for the SeatFormContextProvider component. */
type ProviderProps = FormOptions<SeatFormValues, SeatForm> & {
    children: ReactNode;
};

/**
 * Provides state management for seat form initialization, active editing, and server response tracking.
 */
const SeatFormContextProvider = (props: ProviderProps) => {
    const { children, ...options } = props;

    const [initialValues, setInitialValues] = useState<SeatFormValues | undefined>(undefined);
    const [currentValues, setCurrentValues] = useState<SeatFormValues | undefined>(undefined);
    const [returnedSeats, setReturnedSeats] = useState<SeatDetails[]>([]);

    const values = {
        initialValues,
        setInitialValues,
        currentValues,
        setCurrentValues,
        returnedSeats,
        setReturnedSeats,
        options,
    };

    return (
        <SeatFormContext.Provider value={values}>
            {children}
        </SeatFormContext.Provider>
    );
};

export default SeatFormContextProvider;