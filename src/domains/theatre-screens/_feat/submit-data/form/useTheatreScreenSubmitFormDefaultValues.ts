/**
 * @fileoverview Dependency hook for generating and synchronising Theatre Screen form default values.
 */

import {useRef} from "react";
import {isEqual} from "lodash";
import {TheatreScreen} from "@/domains/theatre-screens/_schema";
import {TheatreScreenFormValues} from "@/domains/theatre-screens/_feat/submit-data/schema";
import {FormValuesConfig} from "@/common/_feat/submit-data";

/**
 * Computes a prioritized set of default values and manages synchronization.
 */
export function useTheatreScreenSubmitFormDefaultValues(
    {presetValues, editEntity}: FormValuesConfig<TheatreScreenFormValues, TheatreScreen>
): TheatreScreenFormValues {
    const defaultValues: TheatreScreenFormValues = {
        name: "",
        capacity: "",
        screenType: undefined,
        theatre: undefined,
        ...editEntity,
        ...presetValues,
    };

    const heldValues = useRef<TheatreScreenFormValues>(defaultValues);

    if (!isEqual(heldValues.current, defaultValues)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current ?? defaultValues;
}