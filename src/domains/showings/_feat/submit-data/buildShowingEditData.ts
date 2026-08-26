/**
 * @fileoverview Utility function and types for transforming showing entities into form edit data.
 */

import {AnyValues} from "@/common/_types";
import {ShowingFormData} from "@/domains/showings/_schema/form";
import {PopulatedShowing, Showing, ShowingConfig, ShowingDetails} from "@/domains/showings/_schema/showing";
import {getLocalShowingSchedule,} from "@/domains/showings/_feat/submit-data/getLocalShowingSchedule.ts";

/** Form values type for editing showing entity fields. */
export type ShowingEditData = AnyValues<ShowingFormData>;

/** Configuration options for building showing edit form data. */
type BuilderConfig = {
    showing: Showing | PopulatedShowing | ShowingDetails;
}

/** Transforms a showing entity into a form-compatible payload for editing. */
export function buildShowingEditData(
    {showing}: BuilderConfig
): ShowingEditData {
    const {config, startTime, endTime, screen, theatre, movie, ...remShowing} = showing;

    const showingDateAndTime = getLocalShowingSchedule({
        startTime: showing?.startTime,
        endTime: showing?.endTime,
        localTimezone: remShowing.timezone,
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
        config: showingConfig,
        ...remShowing,
        ...showingDateAndTime,
        ...showingReferences,
    };
}