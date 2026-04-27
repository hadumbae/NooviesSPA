/** @fileoverview Hook for computing and memoizing default form values for movie credits. */

import {useMemo, useRef} from "react";
import {isEqual} from "lodash";
import {MovieCredit} from "@/domains/moviecredit/schemas/model/MovieCreditSchema.ts";
import {MovieCreditFormValues} from "@/domains/moviecredit/_feat/submit-data/schemas/MovieCreditFormValuesSchema.ts";

/** Parameters for the useMovieCreditSubmitFormDefaultValues hook. */
type DefaultParams = {
    presetValues?: Partial<MovieCreditFormValues>;
    credit?: MovieCredit;
};

/**
 * Generates and memoizes default values for the movie credit submission form.
 * Merges optional preset values with an existing credit entity and maintains a stable reference.
 */
export function useMovieCreditSubmitFormDefaultValues(
    {presetValues, credit}: DefaultParams = {}
): MovieCreditFormValues {

    const heldValues = useRef<MovieCreditFormValues | null>(null);

    const defaultValues: MovieCreditFormValues = useMemo(() => ({
        department: "",
        movie: undefined,
        person: undefined,
        roleType: undefined,
        displayRoleName: "",
        notes: "",
        creditedAs: "",
        characterName: "",
        billingOrder: "",
        isPrimary: false,
        uncredited: false,
        voiceOnly: false,
        cameo: false,
        motionCapture: false,
        archiveFootage: false,
        ...credit,
        ...presetValues,
    }), [presetValues, credit]);

    if (!isEqual(heldValues.current, defaultValues)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current ?? defaultValues;
}