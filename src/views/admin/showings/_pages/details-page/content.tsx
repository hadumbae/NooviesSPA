/**
 * @fileoverview Main content layout for the Showing Details admin page.
 */

import {ReactElement} from "react";
import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import {ShowingDetailsViewData} from "@/views/admin/showings/_feat";
import {ShowingDetailsPageSeatingSection} from "@/views/admin/showings/_pages/details-page/sections";
import {SeatMapDetailsPanelContextProvider} from "@/domains/seatmaps";
import {
    ShowingDetailsPageActions,
    ShowingDetailsPageBreadcrumbs,
    ShowingDetailsPageToggles
} from "@/views/admin/showings/_pages/details-page/elements";
import {
    ScreenSummaryCard,
    ShowingLanguagesCard,
    ShowingMovieCard,
    ShowingStatusCard,
    ShowingTimesCard,
    TheatreSummaryCard
} from "@/views/admin/showings/_comp";
import {IconButton, PageHeader} from "@/views/common/_comp";
import {Ellipsis} from "lucide-react";

/** Renders the core content of the Showing Details page. */
export function ShowingDetailsPageContent(
    {showing, seating, theatre, screen, movie}: ShowingDetailsViewData
): ReactElement {
    const {_id: showingID, slug: showingSlug, startTime, timezone} = showing;
    const {name: theatreName} = theatre;
    const {name: screenName} = screen;
    const {title: movieTitle, releaseDate} = movie;

    const formattedReleaseDate = releaseDate?.toFormat("yyyy") ?? "Unreleased";

    return (
        <PageFlexWrapper>
            <PageHeader
                title={`${movieTitle} (${formattedReleaseDate})`}
                description={`Showing on ${screenName} at ${theatreName}.`}
                breadcrumbs={
                    <ShowingDetailsPageBreadcrumbs
                        movieTitle={movieTitle}
                        startTime={startTime}
                    />
                }
                actions={
                    <ShowingDetailsPageToggles showingSlug={showingSlug}>
                        <IconButton icon={Ellipsis}/>
                    </ShowingDetailsPageToggles>
                }
            />

            <section className="space-y-3">
                <PageSectionHeader text="Basic Details"/>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    <ShowingTimesCard showing={showing} localTimezone={timezone} classNames={{card: "h-full"}}/>
                    <ShowingLanguagesCard showing={showing} classNames={{card: "h-full"}}/>
                    <ShowingStatusCard showing={showing} classNames={{card: "h-full md:col-span-2 xl:col-span-1"}}/>
                </div>
            </section>

            <SeatMapDetailsPanelContextProvider>
                <ShowingDetailsPageSeatingSection showing={showing} seating={seating}/>
            </SeatMapDetailsPanelContextProvider>

            <div className="flex flex-col space-y-4 md:m-48 xl:m-64">
                <section className="space-y-3">
                    <PageSectionHeader text="Movie"/>
                    <ShowingMovieCard movie={movie}/>
                </section>

                <section className="space-y-3 lg:h-1/2">
                    <PageSectionHeader text="Theatre"/>
                    <TheatreSummaryCard theatre={theatre}/>
                </section>

                <section className="space-y-3 lg:h-1/2">
                    <PageSectionHeader text="Screen"/>
                    <ScreenSummaryCard screen={screen}/>
                </section>
            </div>

            <ShowingDetailsPageActions
                showingID={showingID}
                className="hidden"
            />
        </PageFlexWrapper>
    );
}
