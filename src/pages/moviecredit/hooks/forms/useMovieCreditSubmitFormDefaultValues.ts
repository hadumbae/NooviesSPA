import {useRef} from "react";
import {MovieCreditFormValues} from "@/pages/moviecredit/schemas/form/MovieCreditForm.types.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {isEqual} from "lodash";

type DefaultParams = {
    presetValues?: Partial<MovieCreditFormValues>;
    credit?: MovieCredit;
}

export default function useMovieCreditSubmitFormDefaultValues(params?: DefaultParams): MovieCreditFormValues {
    const {presetValues, credit} = params || {};

    const heldValues = useRef<MovieCreditFormValues | null>(null);

    const department = getDefaultValue(presetValues?.department, credit?.department, "");

    const baseValues = {
        movie: getDefaultValue(presetValues?.movie, credit?.movie, undefined),
        person: getDefaultValue(presetValues?.person, credit?.person, undefined),
        roleType: getDefaultValue(presetValues?.roleType, credit?.person, undefined),
        displayRoleName: getDefaultValue(presetValues?.displayRoleName, credit?.displayRoleName, ""),
        notes: getDefaultValue(presetValues?.notes, credit?.notes, ""),
    };

    const crewValues = {
        creditedAs: "",
        characterName: "",
        billingOrder: "",
        isPrimary: false,
        uncredited: false,
        voiceOnly: false,
        cameo: false,
        motionCapture: false,
        archiveFootage: false,
    };

    const castValues = {
        creditedAs: getDefaultValue(presetValues?.creditedAs, credit?.creditedAs, ""),
        characterName: getDefaultValue(presetValues?.characterName, credit?.characterName, ""),
        billingOrder: getDefaultValue(presetValues?.billingOrder, credit?.billingOrder, ""),
        isPrimary: getDefaultValue(presetValues?.isPrimary, credit?.isPrimary, false),
        uncredited: getDefaultValue(presetValues?.uncredited, credit?.uncredited, false),
        voiceOnly: getDefaultValue(presetValues?.voiceOnly, credit?.voiceOnly, false),
        cameo: getDefaultValue(presetValues?.cameo, credit?.cameo, false),
        motionCapture: getDefaultValue(presetValues?.motionCapture, credit?.motionCapture, false),
        archiveFootage: getDefaultValue(presetValues?.archiveFootage, credit?.archiveFootage, false),
    };

    const defaultValues: MovieCreditFormValues = {
        department,
        ...baseValues,
        ...(department === "CREW" && crewValues),
        ...(department === "CAST" && castValues)
    };

    if (!isEqual(heldValues.current, defaultValues)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current as MovieCreditFormValues;
}