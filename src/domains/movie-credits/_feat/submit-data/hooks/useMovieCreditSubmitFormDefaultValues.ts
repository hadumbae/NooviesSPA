/**
 * @fileoverview Hook for computing and memoizing default form values for movie credits.
 */

import {useRef} from "react";
import {isEqual} from "lodash";
import {MovieCredit} from "@/domains/movie-credits/_schemas/model/MovieCreditSchema.ts";
import {FormValuesConfig} from "@/common/_feat/submit-data";
import {MovieCreditFormValues} from "@/domains/movie-credits/_feat/submit-data/schemas/MovieCreditFormSchema.ts";

/**
 * Generates and memoizes default values for the movie credit submission form by merging presets and existing entities.
 */
export function useMovieCreditSubmitFormDefaultValues(
    {presetValues, editEntity}: FormValuesConfig<MovieCreditFormValues, MovieCredit> = {}
): MovieCreditFormValues {
    const defaultValues: MovieCreditFormValues = {
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
        ...editEntity,
        ...presetValues,
    };

    const heldValues = useRef<MovieCreditFormValues>(defaultValues);

    if (!isEqual(heldValues.current, defaultValues)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current;
}