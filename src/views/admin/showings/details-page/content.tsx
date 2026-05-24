/**
 * @fileoverview Main content layout for the Showing Details admin page.
 */

import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import {ShowingDetailsHeader} from "@/views/admin/showings/details-page/header.tsx";
import {ReactElement} from "react";
import {ShowingDetailsViewData} from "@/views/admin/showings/_feat/admin-view-data";
import {
    ShowingLanguagesCard,
    ShowingStatusCard,
    ShowingTimesCard
} from "@/views/admin/showings/_comp/showing-details-cards";
import SeatMapDetailsPanelContextProvider
    from "@/domains/seatmap/context/details-panel-context/SeatMapDetailsPanelContextProvider.tsx";
import {
    ShowingDetailsPageSeatingSection
} from "@/views/admin/showings/details-page/sections/ShowingDetailsPageSeatingSection.tsx";
import {
    ScreenSummaryCard,
    ShowingMovieCard,
    TheatreSummaryCard
} from "@/views/admin/showings/_comp/showing-reference-cards";
import {ShowingDetailsPageActions} from "@/views/admin/showings/details-page/actions.tsx";

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
