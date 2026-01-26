import {UseShowingFormParams} from "@/pages/showings/hooks/forms/useShowingSubmitForm.types.ts";
import {useMemo, useRef} from "react";
import {ShowingFormValues} from "@/pages/showings/schema/form/ShowingFormValues.types.ts";
import getShowingDateAndTimeFormValues from "@/common/utility/date-and-time/getShowingDateAndTimeFormValues.ts";
import {isEqual} from "lodash";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";

/**
 * Computes and returns the default values for the showing submit form.
 *
 * The resulting values are derived from:
 * - An existing showing (edit mode)
 * - Timezone-aware date and time formatting
 * - Optional preset value overrides
 *
 * To avoid unnecessary form resets, the hook preserves referential
 * equality by caching the previously resolved values and only updating
 * them when a deep comparison detects a change.
 *
 * @param params - Parameters used to resolve the form's default values
 * @returns Default values for the showing submit form
 */
export default function useShowingSubmitFormDefaultValues(
    params: UseShowingFormParams
): ShowingFormValues {
    const {showing, theatreTimezone, presetValues} = params;
    const {config, startTime, endTime, ...remShowing} = showing ? showing : {};

    const formValues = useRef<ShowingFormValues | null>(null);

    // --- DATE AND TIME ---
    const showingDateAndTime = useMemo(
        () => getShowingDateAndTimeFormValues({
            startTime: showing?.startTime,
            endTime: showing?.endTime,
            theatreTimezone,
        }),
        [showing, theatreTimezone]
    );

    // --- CONFIG ---
    const formattedConfig = {
        canReserveSeats: getDefaultValue(
            presetValues?.config?.canReserveSeats,
            showing?.config?.canReserveSeats,
            false
        )
    };

    // --- DEFAULT VALUES ---
    const defaultValues: ShowingFormValues = useMemo(
        () => ({
            ticketPrice: "",
            language: "",
            subtitleLanguages: [],
            isSpecialEvent: "",
            isActive: "",
            movie: "",
            theatre: "",
            screen: "",
            status: "SCHEDULED",
            theatreCity: "",
            theatreState: "",
            theatreCountry: undefined,
            config: {canReserveSeats: false},

            ...remShowing,
            ...showingDateAndTime,
            ...presetValues,
            ...formattedConfig,
        }),
        [showing, presetValues, showingDateAndTime, formattedConfig]
    );

    // --- SYNC VALUES ---
    if (!isEqual(formValues.current, defaultValues)) {
        formValues.current = defaultValues;
    }

    return formValues.current ?? defaultValues;
}
