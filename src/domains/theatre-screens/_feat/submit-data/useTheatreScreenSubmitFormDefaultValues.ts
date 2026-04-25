/**
 * @fileoverview Dependency hook for generating and synchronizing Theatre Screen form default values.
 */

import {useEffect, useMemo, useRef} from "react";
import {isEqual} from "lodash";
import {TheatreScreen} from "@/domains/theatre-screens/schema/model";
import {TheatreScreenFormValues} from "@/domains/theatre-screens/_feat/submit-data/TheatreScreenFormValuesSchema.ts";

/**
 * Parameters for computing the hierarchical default values of the form.
 */
type ValuesParams = {
    presetValues?: Partial<TheatreScreenFormValues>;
    screen?: TheatreScreen;
};

/**
 * Computes a prioritized set of default values and manages synchronization.
 */
export function useTheatreScreenSubmitFormDefaultValues(params: ValuesParams): TheatreScreenFormValues {
    const {presetValues, screen} = params;

    const heldValues = useRef<TheatreScreenFormValues | null>(null);

    const defaultValues: TheatreScreenFormValues = useMemo(() => ({
        name: "",
        capacity: "",
        screenType: undefined,
        theatre: undefined,
        ...screen,
        ...presetValues,
    }), [screen, presetValues]);

    useEffect(() => {
        if (!isEqual(heldValues.current, defaultValues)) {
            heldValues.current = defaultValues;
        }
    }, [defaultValues]);

    return heldValues.current ?? defaultValues;
}