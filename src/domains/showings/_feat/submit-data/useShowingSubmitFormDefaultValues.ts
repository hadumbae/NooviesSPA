/**
 * @fileoverview Hook for calculating and synchronizing default form values for showing submissions.
 */

import {ShowingFormValuesConfig} from "@/domains/showings/_feat/submit-data/useShowingSubmitForm.types.ts";
import {useMemo, useRef} from "react";
import getShowingDateAndTimeFormValues from "@/common/utility/date-and-time/getShowingDateAndTimeFormValues.ts";
import {isEqual} from "lodash";
import getDefaultValue from "@/common/utility/forms/getDefaultValue.ts";

import {ShowingFormValues} from "@/domains/showings/schema/form";

/**
 * Computes the initial and synchronized state for the showing submission form.
 */
export function useShowingSubmitFormDefaultValues(
    params: ShowingFormValuesConfig
): ShowingFormValues {
    const {showing, theatreTimezone, presetValues} = params;
    const {config, startTime, endTime, ...remShowing} = showing ? showing : {};

    const formValues = useRef<ShowingFormValues | null>(null);

    const showingDateAndTime = useMemo(
        () => getShowingDateAndTimeFormValues({
            startTime: showing?.startTime,
            endTime: showing?.endTime,
            theatreTimezone,
        }),
        [showing, theatreTimezone]
    );

    const formattedConfig = {
        canReserveSeats: getDefaultValue(
            presetValues?.config?.canReserveSeats,
            showing?.config?.canReserveSeats,
            false
        )
    };

    const defaultValues: ShowingFormValues = useMemo(
        () => ({
            ticketPrice: "",
            language: "",
            subtitleLanguages: [],
            movie: "",
            theatre: "",
            screen: "",
            status: "SCHEDULED",
            localTimezone: theatreTimezone ?? "",
            theatreCity: "",
            theatreState: "",
            theatreCountry: undefined,
            config: {
                isActive: true,
                isSpecialEvent: false,
                canReserveSeats: false
            },

            ...remShowing,
            ...showingDateAndTime,
            ...presetValues,
            ...formattedConfig,
        }),
        [showing, presetValues, showingDateAndTime, formattedConfig]
    );

    if (!isEqual(formValues.current, defaultValues)) {
        formValues.current = defaultValues;
    }

    return formValues.current ?? defaultValues;
}
