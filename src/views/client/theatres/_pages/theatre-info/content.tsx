/**
 * @fileoverview Presentational component for rendering theatre details and screen listings.
 */

import {ReactElement, useEffect} from "react";
import {PageFlexWrapper, PageHeader} from "@/views/common/_comp";

import {TheatreScreenSchedule} from "@/domains/theatre-screens";
import {
    formatTheatreDetails,
    TheatreDetails,
    TheatreMovieRuntimes,
    useTheatreInfoQueryOptionsContext
} from "@/domains/theatres";
import {DateTime} from "luxon";
import {QueryOptionsCalendarInput} from "@/views/common/_feat";
import {DateOnlyString} from "@/common/_schemas";
import {getTodayDateOnly} from "@/common/_feat";
import {TheatreInfoScreensSection} from "@/views/client/theatres/_pages/theatre-info/sections";
import {
    TheatreInfoUpcomingSection
} from "@/views/client/theatres/_pages/theatre-info/sections/TheatreInfoUpcomingSection.tsx";

/** Props for the TheatreInfoPageContent component. */
type ContentProps = {
    setPageTitle: (title: string) => void;
    theatre: TheatreDetails;
    screens: TheatreScreenSchedule[];
    localDate: string;
    upcoming: TheatreMovieRuntimes[];
};

/**
 * Presentational component for rendering theatre details and screen listings.
 */
export function TheatreInfoPageContent(
    {theatre, screens, localDate, upcoming, setPageTitle}: ContentProps
): ReactElement {
    const {name, location: {timezone}, formatted: {address}} = formatTheatreDetails(theatre);

    const {values: {date}, setValues} = useTheatreInfoQueryOptionsContext();
    const setQueryValue = (value?: DateOnlyString) => setValues({date: value ?? getTodayDateOnly()});

    useEffect(() => {
        setPageTitle(`Theatre | ${theatre.name}`);
    }, [setPageTitle, theatre.name]);

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

            <TheatreInfoScreensSection
                screens={screens}
                localDate={localDate}
                timezone={timezone}
            />

            <TheatreInfoUpcomingSection
                upcoming={upcoming}
            />
        </PageFlexWrapper>
    );
}

