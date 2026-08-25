/**
 * @fileoverview Presentational component for rendering theatre details and screen listings.
 */

import {ReactElement} from "react";
import {PageFlexWrapper, PageHeader, SectionTitle} from "@/views/common/_comp";
import {EmptyArrayContainer} from "@/views/common/_comp/text-display/EmptyArrayContainer.tsx";

import {TheatreScreenSchedule} from "@/domains/theatre-screens";
import {formatTheatreDetails, TheatreDetails, useTheatreInfoQueryOptionsContext} from "@/domains/theatres";
import {TheatreScreenShowingSelectCard} from "@/views/client/theatre-screens/_feat";
import {DateTime} from "luxon";
import {QueryOptionsCalendarInput} from "@/views/common/_feat";
import {DateOnlyString} from "@/common/_schemas";
import {getTodayDateOnly} from "@/common/_feat";

/** Props for the TheatreInfoPageContent component. */
type ContentProps = {
    theatre: TheatreDetails;
    screens: TheatreScreenSchedule[];
    localDate: string;
};

/**
 * Presentational component for rendering theatre details and screen listings.
 */
export function TheatreInfoPageContent(
    {theatre, screens, localDate}: ContentProps
): ReactElement {
    const {name, location: {timezone}, formatted: {address}} = formatTheatreDetails(theatre);
    const formattedDate = DateTime.fromISO(localDate).toFormat("dd LLLL, yyyy");

    const {values: {date}, setValues} = useTheatreInfoQueryOptionsContext();
    const setQueryValue = (value?: DateOnlyString) => setValues({date: value ?? getTodayDateOnly()});

    return (
        <PageFlexWrapper>
            <PageHeader
                title={name}
                description={address}
                actions={
                    <QueryOptionsCalendarInput
                        setQueryValue={setQueryValue}
                        presetValue={DateTime.fromISO(date).toJSDate()}
                    />
                }
            />

            {
                screens.length > 0 ? (
                        <section className="flex-1 space-y-2">
                            <SectionTitle>Screens • {formattedDate}</SectionTitle>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                {screens.map((screen) => (
                                    <TheatreScreenShowingSelectCard
                                        key={screen._id}
                                        screen={screen}
                                        timezone={timezone}
                                    />
                                ))}
                            </div>
                        </section>
                    )
                    : <EmptyArrayContainer text="There Are No Screens" className="flex-1"/>
            }
        </PageFlexWrapper>
    );
}

