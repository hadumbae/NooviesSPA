/**
 * @fileoverview Layout component for rendering the structural sections of the Theatre Screen details page.
 */

import {ReactElement} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {
    TheatreScreenDetailsBreadcrumbs,
    TheatreScreenDetailsPageScreenActions
} from "@/views/admin/theatres/_pages/theatre-screen-details-page/elements";

import {TheatreScreenWithVirtuals} from "@/domains/theatre-screens/_schema/model";
import {TheatreDetails} from "@/domains/theatres";
import {SeatDetails} from "@/domains/seats/_schema/model";
import {useSetAdminPageTitle} from "@/common/_feat/handle-pages";
import {PageHeader} from "@/views/common/_comp";
import {
    TheatreScreenDetailsFormSection,
    TheatreScreenDetailsLayoutSection
} from "@/views/admin/theatres/_pages/theatre-screen-details-page/sections";
import {
    TheatreScreenDetailsShowingsSection
} from "@/views/admin/theatres/_pages/theatre-screen-details-page/sections/TheatreScreenDetailsShowingsSection.tsx";
import {ShowingDetails} from "@/domains/showings";

/** Props for the TheatreScreenDetailsPageContent component. */
type ContentProps = {
    theatre: TheatreDetails;
    screen: TheatreScreenWithVirtuals;
    seats: SeatDetails[];
    recentShowings: ShowingDetails[];
};

/**
 * Renders the breadcrumbs, header, and tabbed interface for the screen details view.
 */
export function TheatreScreenDetailsPageContent(
    {theatre, screen, seats, recentShowings}: ContentProps
): ReactElement {
    const {_id: screenID, name: screenName} = screen;
    const {_id: theatreID, name: theatreName, slug: theatreSlug,} = theatre;

    useSetAdminPageTitle({presetTitle: `Screen | ${screenName}`})

    return (
        <PageFlexWrapper>
            <PageHeader
                title={`${screenName} Details`}
                description={`Screen at ${theatreName}. Handle seats and showings here.`}
                breadcrumbs={
                    <TheatreScreenDetailsBreadcrumbs
                        theatreSlug={theatreSlug}
                        theatreName={theatreName}
                        screenName={screenName}
                    />
                }
            />

            <TheatreScreenDetailsLayoutSection
                seating={seats}
            />

            <TheatreScreenDetailsFormSection
                screenID={screenID}
                theatreID={theatreID}
            />

            <TheatreScreenDetailsShowingsSection
                screenID={screenID}
                showings={recentShowings}
            />

            <TheatreScreenDetailsPageScreenActions
                theatre={theatre}
                screen={screen}
                className="hidden"
            />
        </PageFlexWrapper>
    );
}