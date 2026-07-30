/**
 * @fileoverview Hook for calculating and memoizing default form values for user index query options.
 */

import {useRef} from "react";
import {isEqual} from "lodash";
import {QueryOptionFormValues} from "@/common/_feat";
import {UserQueryOptions} from "@/domains/users/_schema/query-options";
import {UserIndexQueryOptionFormValues} from "@/domains/users/_feat/submit-query-options";

/** Computes the initial form state by merging preset values and existing query options. */
export function useUserIndexQueryOptionFormDefaultValues(
    {presetValues, queryOptions}: QueryOptionFormValues<UserIndexQueryOptionFormValues, UserQueryOptions>
): UserIndexQueryOptionFormValues {
    const initialValues: UserIndexQueryOptionFormValues = {
        name: "",
        email: "",
        uniqueCode: "",
        roles: [],
        sortByName: "",
        sortByEmail: "",
        sortByUniqueCode: "",
        ...queryOptions,
        ...presetValues,
    };

    const heldValues = useRef<UserIndexQueryOptionFormValues>(initialValues);

    if (!isEqual(heldValues.current, initialValues)) {
        heldValues.current = initialValues;
    }

    return heldValues.current;
}