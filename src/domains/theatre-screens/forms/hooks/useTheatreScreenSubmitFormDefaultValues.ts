/**
 * @file Dependency hook for generating and synchronizing Theatre Screen form default values.
 * @filename useScreenSubmitFormDefaultValues.ts
 */

import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import { ScreenFormContext } from "@/domains/theatre-screens/contexts/screen-form/ScreenFormContext.ts";
import { useEffect, useRef } from "react";
import { isEqual } from "lodash";
import {TheatreScreen} from "@/domains/theatre-screens/schema/model";
import {TheatreScreenFormValues} from "@/domains/theatre-screens/forms/schema/TheatreScreenFormValuesSchema.ts";

/**
 * Parameters for computing the hierarchical default values of the form.
 */
type ValuesParams = {
    /** High-priority overrides (e.g., values passed from a modal launcher). */
    presetValues?: Partial<TheatreScreenFormValues>;

    /** Entity data used when editing an existing record. */
    screen?: TheatreScreen;
};

/**
 * Computes a prioritized set of default values and synchronizes them with the Form Context.
 * @param params - The entity and preset data used to derive defaults.
 * @returns The final merged {@link TheatreScreenFormValues} object.
 */
export default function useTheatreScreenSubmitFormDefaultValues(params: ValuesParams): TheatreScreenFormValues {
    const { presetValues, screen } = params;

    const heldValues = useRef<TheatreScreenFormValues | null>(null);

    const { setInitialValues, currentValues } = useRequiredContext({ context: ScreenFormContext });

    const defaultValues: TheatreScreenFormValues = {
        name: "",
        capacity: "",
        screenType: undefined,
        theatre: undefined,
        ...screen,
        ...presetValues,
    };

    useEffect(() => {
        if (!isEqual(heldValues.current, defaultValues)) {
            heldValues.current = defaultValues;
            setInitialValues(defaultValues);
        }
    }, [defaultValues, setInitialValues]);

    return currentValues ?? (heldValues.current ?? defaultValues) as TheatreScreenFormValues;
}