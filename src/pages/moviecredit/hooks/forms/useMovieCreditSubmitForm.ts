import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    MovieCreditFormValues,
    MovieCreditSubmit,
    MovieCreditSubmitSchema
} from "@/pages/moviecredit/schemas/model/form/MovieCreditSubmitSchema.ts";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/base/MovieCreditSchema.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";

interface SubmitParams {
    credit?: MovieCredit;
    presetValues?: Partial<MovieCreditSubmit>
}

export default function useMovieCreditSubmitForm(params?: SubmitParams): UseFormReturn<MovieCreditFormValues> {
    const {credit, presetValues} = params || {};

    const baseValues = {
        roleType: "" as "" | "CREW" | "CAST",
        movie: getDefaultValue({preset: presetValues?.movie, data: credit?.movie, fallback: undefined}),
        person: getDefaultValue({preset: presetValues?.person, data: credit?.movie, fallback: undefined}),
        notes: getDefaultValue({preset: presetValues?.notes, data: credit?.notes, fallback: ""}),
        uncredited: getDefaultValue({preset: presetValues?.uncredited, data: credit?.uncredited, fallback: false}),
        voiceOnly: getDefaultValue({preset: presetValues?.voiceOnly, data: credit?.voiceOnly, fallback: false}),
        cameo: getDefaultValue({preset: presetValues?.cameo, data: credit?.cameo, fallback: false}),
        motionCapture: getDefaultValue({preset: presetValues?.motionCapture, data: credit?.motionCapture, fallback: false}),
    };

    const crewValues = {
        job: getDefaultValue({
            preset: (presetValues?.roleType === "CREW" && presetValues.job),
            data: (credit?.roleType === "CREW" && credit.job),
            fallback: ""
        }),
    };

    const castValues = {
        characterName: getDefaultValue({
            preset: (presetValues?.roleType === "CAST" && presetValues.characterName),
            data: (credit?.roleType === "CAST" && credit.characterName),
            fallback: ""
        }),
        billingOrder: getDefaultValue({
            preset: (presetValues?.roleType === "CAST" && presetValues.billingOrder),
            data: (credit?.roleType === "CAST" && credit.billingOrder),
            fallback: ""
        }),
    };

    const roleType = getDefaultValue({
        preset: presetValues?.roleType,
        data: credit?.roleType,
        fallback: baseValues["roleType"]
    });

    const defaultValues = {
        ...baseValues,
        ...(roleType === "CREW" && crewValues),
        ...(roleType === "CAST" && castValues)
    } as MovieCreditFormValues;

    return useForm<MovieCreditFormValues>({
        resolver: zodResolver(MovieCreditSubmitSchema),
        defaultValues,
    });
}