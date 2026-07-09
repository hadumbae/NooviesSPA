/**
 * @fileoverview Hook for managing and synchronising person search query form values.
 */

import {useRef} from "react";
import {isEqual} from "lodash";
import {
    BrowsePersonsQueryOptionFormValues
} from "@/domains/persons/_feat/client-view-data/browse-persons/form/BrowsePersonsQueryOptionFormValues.ts";
import {BrowsePersonsQueryOptions} from "@/domains/persons";
import {parseSearchParamFormValues} from "@/common/_feat";

/** Configuration for initialising person query form values. */
type ValueConfig = {
    queryValues?: BrowsePersonsQueryOptions;
    presetValues?: Partial<BrowsePersonsQueryOptionFormValues>;
};

/**
 * Manages the state of person query options, ensuring values remain synchronised with provided presets.
 */
export function useBrowsePersonsQueryOptionFormDefaultValues(
    {queryValues, presetValues}: ValueConfig
): BrowsePersonsQueryOptionFormValues {
    const parsedOptions = queryValues ? parseSearchParamFormValues(queryValues) : {};

    const defaultValues: BrowsePersonsQueryOptionFormValues = {
        name: "",
        sortByName: "1",
        ...parsedOptions,
        ...presetValues,
    };

    const heldValues = useRef<BrowsePersonsQueryOptionFormValues>(defaultValues);

    if (!isEqual(heldValues.current, defaultValues)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current;
}