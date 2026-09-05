/**
 * @fileoverview Section component for displaying screens and their corresponding showtimes for a specific date in the theatre view.
 */

import {ReactElement} from "react";
import {TheatreScreenSchedule} from "@/domains/theatre-screens/_schema/model";
import {EmptyArrayContainer, PageSectionHeader} from "@/views/common/_comp";
import {TheatreScreenShowingSelectCard} from "@/views/client/theatre-screens";
import {DateOnlyString, IANATimezone} from "@/common/_schemas";
import {DateTime} from "luxon";

/** Props for the TheatreInfoScreensSection component. */
type SectionProps = {
    timezone: IANATimezone;
    localDate: DateOnlyString;
    screens: TheatreScreenSchedule[];
};

/** Displays a grid of available theatre screens with their schedules for a selected date, or an empty state if none are found. */
export function TheatreInfoScreensSection(
    {timezone, localDate, screens}: SectionProps
): ReactElement {
    const formattedDate = DateTime.fromISO(localDate).toFormat("dd LLLL, yyyy");

    return (
        <section className="space-y-2">
            <PageSectionHeader text={`Screens • ${formattedDate}`}/>

            {
                screens.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {screens.map((screen) => (
                                <TheatreScreenShowingSelectCard
                                    key={screen._id}
                                    screen={screen}
                                    timezone={timezone}
                                />
                            ))}
                        </div>
                    )
                    : <EmptyArrayContainer text="There Are No Screens" className="h-full"/>
            }
        </section>
    );
}