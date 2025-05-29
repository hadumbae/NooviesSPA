import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";
import {
    MovieCreditFormValues,
    MovieCreditSubmit
} from "@/pages/moviecredit/schemas/model/form/MovieCreditSubmitSchema.ts";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/base/MovieCreditSchema.ts";
import {useRef} from "react";
import {isEqual} from "lodash";

type GenerationParams = {
    credit?: MovieCredit;
    presetValues?: Partial<MovieCreditSubmit>;
}

export default function useMovieCreditSubmitFormDefaultValues(params?: GenerationParams): MovieCreditFormValues {
    const {credit, presetValues} = params || {};

    const heldDefaults = useRef<MovieCreditFormValues | null>(null);

    const baseValues = {
        movie: getDefaultValue(presetValues?.movie, credit?.movie, undefined),
        person: getDefaultValue(presetValues?.person, credit?.movie, undefined),
        notes: getDefaultValue(presetValues?.notes, credit?.notes, ""),
        uncredited: getDefaultValue(presetValues?.uncredited, credit?.uncredited, false),
        voiceOnly: getDefaultValue(presetValues?.voiceOnly, credit?.voiceOnly, false),
        cameo: getDefaultValue(presetValues?.cameo, credit?.cameo, false),
        motionCapture: getDefaultValue(presetValues?.motionCapture, credit?.motionCapture, false),
    };

    const crewValues = {
        job: getDefaultValue(
            presetValues?.roleType === "CREW" ? presetValues.job : null,
            credit?.roleType === "CREW" ? credit.job : null,
            "",
        ),
    };

    const castValues = {
        characterName: getDefaultValue(
            presetValues?.roleType === "CAST" ? presetValues.characterName : null,
            credit?.roleType === "CAST" ? credit.characterName : null,
            "",
        ),
        billingOrder: getDefaultValue(
            presetValues?.roleType === "CAST" ? presetValues.billingOrder : null,
            credit?.roleType === "CAST" ? credit.billingOrder : null,
            "",
        ),
    };

    const roleType = getDefaultValue(presetValues?.roleType, credit?.roleType, "");

    const nextDefaults = {
        ...baseValues,
        roleType,
        ...(roleType === "CREW" && crewValues),
        ...(roleType === "CAST" && castValues)
    } as MovieCreditFormValues;

    if (!isEqual(heldDefaults.current, nextDefaults)) {
        heldDefaults.current = nextDefaults;
    }

    return heldDefaults.current as MovieCreditFormValues;
}