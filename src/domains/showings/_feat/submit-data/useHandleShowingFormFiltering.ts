/**
 * @fileoverview Custom hook for reacting to showing form field value changes and updating location filtering state.
 */

import {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {MultiStepFormStateContext} from "@/common/_feat";
import {useFormContext} from "react-hook-form";

type HookReturns = {
    isFiltering: boolean;
    setIsFiltering: Dispatch<SetStateAction<boolean>>;
}

/** Custom hook for handling showing form value updates and location filtering logic. */
export function useHandleShowingFormFiltering(): HookReturns {
    const {watch, setValue, resetField} = useFormContext();

    const [isFiltering, setIsFiltering] = useState<boolean>(false);
    const {isHydrated = true} = useContext(MultiStepFormStateContext) ?? {};

    // --- WATCH ---

    const theatre = watch("theatre");
    const city = watch("theatreCity");
    const state = watch("theatreState");
    const country = watch("theatreCountry");

    // --- HOOKS ---

    /** Effect: Reset location filters when the filter panel is closed. */
    useEffect(() => {
        if (!isFiltering) {
            setValue("theatreCity", "");
            setValue("theatreState", "");
            setValue("theatreCountry", undefined);
        }
    }, [isFiltering]);

    /** Effect: Clear selection when location filters are modified. */
    useEffect(() => {
        if (isFiltering) {
            setValue("theatre", undefined);
            setValue("screen", undefined);
            setValue("localTimezone", "");
        }
    }, [city, state, country]);

    /** Effect: Reset screen selection whenever the selected theatre changes. */
    useEffect(() => {
        if (isHydrated) {
            resetField("screen");
        }
    }, [theatre]);

    return {
        isFiltering,
        setIsFiltering,
    }
}