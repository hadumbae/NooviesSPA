import {useRef} from "react";
import {MovieCreditFormValues} from "@/pages/moviecredit/schemas/form/MovieCreditForm.types.ts";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {isEqual} from "lodash";

/**
 * Parameters for {@link useMovieCreditSubmitFormDefaultValues}.
 */
type DefaultParams = {
    /**
     * Optional preset values to prefill the form.
     * These values take priority over `credit` values.
     */
    presetValues?: Partial<MovieCreditFormValues>;

    /**
     * Optional existing `MovieCredit` entity used to populate default values.
     * Used when editing an existing credit.
     */
    credit?: MovieCredit;
};

/**
 * Custom hook to generate default values for a movie credit submission form.
 *
 * This hook merges optional `presetValues` with an existing `MovieCredit` entity (`credit`)
 * to produce a complete `MovieCreditFormValues` object suitable for initializing a form.
 * It ensures consistent defaulting for CAST vs CREW departments and memoizes values
 * to avoid unnecessary re-renders.
 *
 * @param params - Optional parameters including `presetValues` and `credit`.
 *
 * @returns A fully populated {@link MovieCreditFormValues} object containing:
 * - `department` (string)
 * - Base fields: `movie`, `person`, `roleType`, `displayRoleName`, `notes`, `creditedAs`
 * - CAST-specific fields: `characterName`, `billingOrder`, `isPrimary`, `uncredited`, `voiceOnly`, `cameo`, `motionCapture`, `archiveFootage` (used if department is `"CAST"`)
 * - CREW-specific fields: `characterName`, `billingOrder`, `isPrimary`, `uncredited`, `voiceOnly`, `cameo`, `motionCapture`, `archiveFootage` (used if department is `"CREW"`)
 *
 * @remarks
 * - Prefers `presetValues` over values from `credit`.
 * - Uses `getDefaultValue` utility for safe defaulting.
 * - Memoizes the computed values using `useRef` and `lodash.isEqual` to prevent unnecessary recalculation.
 *
 * @example
 * ```ts
 * const defaultValues = useMovieCreditSubmitFormDefaultValues({
 *   presetValues: { displayRoleName: "Hero" },
 *   credit: existingCredit
 * });
 * // defaultValues can be passed to a form initializer like useForm({ defaultValues })
 * ```
 */
export default function useMovieCreditSubmitFormDefaultValues(params?: DefaultParams): MovieCreditFormValues {
    const {presetValues, credit} = params || {};

    const heldValues = useRef<MovieCreditFormValues | null>(null);

    const department = getDefaultValue(presetValues?.department, credit?.department, "");

    const baseValues = {
        movie: getDefaultValue(presetValues?.movie, credit?.movie, undefined),
        person: getDefaultValue(presetValues?.person, credit?.person, undefined),
        roleType: getDefaultValue(presetValues?.roleType, credit?.roleType, undefined),
        displayRoleName: getDefaultValue(presetValues?.displayRoleName, credit?.displayRoleName, ""),
        notes: getDefaultValue(presetValues?.notes, credit?.notes, ""),
        creditedAs: getDefaultValue(presetValues?.creditedAs, credit?.creditedAs, ""),
    };

    const crewValues = {
        characterName: undefined,
        billingOrder: undefined,
        isPrimary: undefined,
        uncredited: undefined,
        voiceOnly: undefined,
        cameo: undefined,
        motionCapture: undefined,
        archiveFootage: undefined,
    };

    const castValues = {
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
