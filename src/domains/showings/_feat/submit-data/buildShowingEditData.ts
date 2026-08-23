/**
 * @fileoverview Utility function and types for transforming showing entities into form edit data.
 */

import {AnyValues} from "@/common/_types";
import {
    getShowingDateAndTimeFormValues,
    PopulatedShowing,
    Showing,
    ShowingConfig,
    ShowingDetails,
    ShowingFormData
} from "@/domains/showings";
import {IANATimezone} from "@/common/_schemas";

/** Form values type for editing showing entity fields. */
export type ShowingEditData = AnyValues<ShowingFormData>;

/** Configuration options for building showing edit form data. */
type BuilderConfig = {
    showing: Showing | PopulatedShowing | ShowingDetails;
    theatreTimezone: IANATimezone;
}

/** Transforms a showing entity into a form-compatible payload for editing. */
export function buildShowingEditData(
    {showing, theatreTimezone}: BuilderConfig
): ShowingEditData {
    const {config, startTime, endTime, screen, theatre, movie, ...remShowing} = showing;

    const showingDateAndTime = getShowingDateAndTimeFormValues({
        startTime: showing?.startTime,
        endTime: showing?.endTime,
        theatreTimezone,
    });

    const showingConfig: ShowingConfig = {
        ...config,
        isActive: true,
        isSpecialEvent: false,
        canReserveSeats: false
    };

    const showingReferences = {
        screen: typeof screen === "string" ? screen : screen._id,
        theatre: typeof theatre === "string" ? theatre : theatre._id,
        movie: typeof movie === "string" ? movie : movie._id,
    }

    return {
        localTimezone: theatreTimezone ?? "",
        config: showingConfig,
        ...remShowing,
        ...showingDateAndTime,
        ...showingReferences,
    };
}