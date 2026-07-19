/**
 * @fileoverview Card component displaying showing start and end times in UTC and local timezones.
 */

import {ReactElement} from "react";
import {Card, CardContent} from "@/views/common/_comp/ui/card.tsx";
import {Showing, ShowingDetails} from "@/domains/showings/_schema/showing";
import {IANATimezone} from "@/common/_schemas/time/IANATimezoneSchema.ts";
import {LabelContent} from "@/views/common/_comp/label-content/LabelContent.tsx";
import {buildShowingDateString} from "@/domains/showings/_feat/formatters";
import {cn} from "@/common/_feat";
import {CardClassNames} from "@/common/_types/card";

/** Props for the ShowingTimesCard component. */
type CardProps = {
    showing: Showing | ShowingDetails;
    localTimezone: IANATimezone;
    classNames?: CardClassNames;
};

/** Displays formatted UTC and local time strings for a specific showing. */
export function ShowingTimesCard(
    {showing, localTimezone, classNames}: CardProps
): ReactElement {
    const {startTime, endTime} = showing;

    const utcDateString = buildShowingDateString({
        start: startTime,
        end: endTime,
    });

    const localDateString = buildShowingDateString({
        start: startTime,
        end: endTime,
        timezone: localTimezone,
    });

    return (
        <Card className={classNames?.card}>
            <CardContent className={cn("space-y-2 p-4", classNames?.content)}>
                <LabelContent label="UTC Time" classNames={{container: "space-y-1"}}>
                    <span className="primary-text font-bold">
                        {utcDateString}
                    </span>
                </LabelContent>

                <LabelContent label="Local Time" classNames={{container: "space-y-1"}}>
                    <span className="primary-text font-bold">
                        {localDateString}
                    </span>
                </LabelContent>
            </CardContent>
        </Card>
    );
}