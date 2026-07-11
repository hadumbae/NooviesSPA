/**
 * @fileoverview Hook for generating default form values for current user reservation queries.
 */

import {
    CurrentUserReservationsQueryOptionFormValues
} from "@/domains/reservations/_feat/fetch-current-user-reservations/form/CurrentUserReservationsQueryOptionFormValues.ts";
import {CurrentUserReservationsQueryOptions} from "@/domains/reservations/_feat/fetch-current-user-reservations/schema";
import {parseSearchParamFormValues} from "@/common/_feat";
import {useRef} from "react";
import {isEqual} from "lodash";
import {FormValuesConfig} from "@/common/_feat/submit-data";

/** Computes and memoizes default form values for current user reservation queries based on search parameters and presets. */
export function useCurrentUserReservationsQueryOptionFormDefaultValues(
    {
        editEntity,
        presetValues
    }: FormValuesConfig<CurrentUserReservationsQueryOptionFormValues, CurrentUserReservationsQueryOptions> = {}
): CurrentUserReservationsQueryOptionFormValues {
    const parsedOptions = editEntity ? parseSearchParamFormValues(editEntity) : {};

    const defaultValues: CurrentUserReservationsQueryOptionFormValues = {
        status: "",
        type: "",
        uniqueCode: "",
        sortByStatus: "",
        sortByDateReserved: "",
        ...parsedOptions,
        ...presetValues,
    };

    const heldValues = useRef<CurrentUserReservationsQueryOptionFormValues>(defaultValues);

    if (!isEqual(heldValues.current, defaultValues)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current;
}