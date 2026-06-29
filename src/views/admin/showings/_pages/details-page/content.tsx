/**
 * @fileoverview Main content layout for the Showing Details admin page.
 */

import {ReactElement} from "react";
import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import {ShowingDetailsViewData} from "@/views/admin/showings/_feat";
import {ShowingDetailsPageSeatingSection} from "@/views/admin/showings/_pages/details-page/sections";
import {SeatMapDetailsPanelContextProvider} from "@/domains/seatmaps";
import {ShowingDetailsHeader, ShowingDetailsPageActions} from "@/views/admin/showings/_pages/details-page/elements";
import {
    ScreenSummaryCard,
    ShowingLanguagesCard,
    ShowingMovieCard,
    ShowingStatusCard,
    ShowingTimesCard,
    TheatreSummaryCard
} from "@/views/admin/showings/_comp";

/** Renders the core content of the Showing Details page. */
export function ShowingDetailsPageContent(
    {showing, seating, theatre, screen, movie}: ShowingDetailsViewData
): ReactElement {
    const {_id: showingID, slug: showingSlug, startTime} = showing;
    const {name: theatreName, location: {timezone: localTimezone}} = theatre;
    const {name: screenName} = screen;
    const {title: movieTitle, releaseDate} = movie;

    return (
        <PageFlexWrapper>
            <ShowingDetailsHeader
                showingSlug={showingSlug}
                showingStartTime={startTime}
                movieTitle={movieTitle}
                releaseDate={releaseDate}
                screenName={screenName}
                theatreName={theatreName}
            />

            <section className="space-y-3">
                <PageSectionHeader text="Basic Details"/>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    <ShowingTimesCard showing={showing} localTimezone={localTimezone} classNames={{card: "h-fit"}}/>
                    <ShowingLanguagesCard showing={showing} classNames={{card: "h-fit"}}/>
                    <ShowingStatusCard showing={showing} classNames={{card: "max-xl:col-span-2"}}/>
                </div>
            </section>

            <SeatMapDetailsPanelContextProvider>
                <ShowingDetailsPageSeatingSection showing={showing} seating={seating}/>
            </SeatMapDetailsPanelContextProvider>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <section className="space-y-3">
                    <PageSectionHeader text="Movie"/>
                    <ShowingMovieCard movie={movie}/>
                </section>

                <div className="space-y-4">
                    <section className="space-y-3">
                        <PageSectionHeader text="Theatre"/>
                        <TheatreSummaryCard theatre={theatre}/>
                    </section>

                    <section className="space-y-3">
                        <PageSectionHeader text="Screen"/>
                        <ScreenSummaryCard screen={screen}/>
                    </section>
                </div>
            </div>

            <ShowingDetailsPageActions
                showingID={showingID}
                className="hidden"
            />
        </PageFlexWrapper>
    );
}
