/**
 * @fileoverview React context for centralizing state and lifecycle management of seat creation and editing forms.
 */

import { createContext, Dispatch, SetStateAction } from "react";
import { SeatDetails } from "@/domains/seats/schema/seat/SeatDetails.types.ts";
import { FormOptions } from "@/common/type/form/HookFormProps.ts";
import {SeatFormData, SeatFormValues} from "@/domains/seats/_feat/submit-data";

/** Context values tracking the lifecycle of seat form data from initialization to server response. */
export type SeatFormContextValues = {
    initialValues: SeatFormValues | undefined;
    setInitialValues: Dispatch<SetStateAction<SeatFormValues | undefined>>;
    currentValues: SeatFormValues | undefined;
    setCurrentValues: Dispatch<SetStateAction<SeatFormValues | undefined>>;
    returnedSeats: SeatDetails[];
    setReturnedSeats: Dispatch<SetStateAction<SeatDetails[]>>;
    options?: FormOptions<SeatFormValues, SeatFormData>;
};

/**
 * Provides access to synchronized seat form state, including editing values and successfully submitted entities.
 */
export const SeatFormContext = createContext<SeatFormContextValues | undefined>(undefined);