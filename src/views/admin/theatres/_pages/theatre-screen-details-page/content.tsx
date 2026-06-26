/**
 * @fileoverview Layout component for rendering the structural sections of the Theatre Screen details page.
 */

import {ReactElement} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {TheatreScreenDetailsPageTabs} from "@/views/admin/theatres/_pages/theatre-screen-details-page/tabs";
import {
    TheatreScreenDetailsHeader,
    TheatreScreenDetailsPageScreenActions
} from "@/views/admin/theatres/_pages/theatre-screen-details-page/elements";

import {TheatreScreenWithVirtuals} from "@/domains/theatre-screens/_schema/model";
import {TheatreDetails} from "@/domains/theatres";
import {SeatDetails} from "@/domains/seats/_schema/model";
import {useSetAdminPageTitle} from "@/common/_feat/handle-pages";

/** Props for the TheatreScreenDetailsPageContent component. */
type ContentProps = {
    theatre: TheatreDetails;
    screen: TheatreScreenWithVirtuals;
    seats: SeatDetails[];
};

/**
 * Renders the breadcrumbs, header, and tabbed interface for the screen details view.
 */
export function TheatreScreenDetailsPageContent(
    {theatre, screen, seats}: ContentProps
): ReactElement {
    const {_id: screenID, name: screenName} = screen;
    const {_id: theatreID, name: theatreName, slug: theatreSlug,} = theatre;

    useSetAdminPageTitle({presetTitle: `Screen | ${screenName}`})

    return (
        <PageFlexWrapper>
            <TheatreScreenDetailsHeader
                theatreSlug={theatreSlug}
                theatreName={theatreName}
                screenName={screenName}
            />

            <TheatreScreenDetailsPageTabs
                theatreID={theatreID}
                screenID={screenID}
                seats={seats}
            />

            <TheatreScreenDetailsPageScreenActions
                theatre={theatre}
                screen={screen}
                className="hidden"
            />
        </PageFlexWrapper>
    );
}